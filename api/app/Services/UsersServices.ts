import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import AvatarProfiles from 'App/Models/AvatarProfiles';
import Files from 'App/Models/Files';
import Users from 'App/Models/Users';
import ProfilesRepository from 'App/Repositories/ProfilesRepository';
import UsersRepository from 'App/Repositories/UsersRepository';
import { CreateFile } from 'App/Services/FilesServices';
import fileSystem from 'fs';
import path from 'path';

export class ReadUser {
  async execute({ params, response }: HttpContextContract): Promise<Users | void> {
    try {
      const user = await UsersRepository.findOne(params.id);
      if (!user) throw new Error('User not found');
      return response.send(user);
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }

  async getByToken({ auth }: HttpContextContract) {
    return await UsersRepository.findOne(auth.user!.id);
  }
}

/**
 * Read all from database
 */
export class ReadAllUser {
  async execute(): Promise<Users[]> {
    return await UsersRepository.findAll();
  }
}

/**
 * Create new User
 */
export class CreateUser {
  /**
   *
   * @param HttpContextContract
   * @returns User stored
   */
  static async execute({ request, response }: HttpContextContract) {
    const data = request.body();
    const trx = await Database.transaction();
    let file: any;
    try {
      const user = await UsersRepository.create(data, trx);
      const { id: fileId, filename }: Files = await CreateFile.execute(request, trx);
      file = filename;
      const { id: profileId } = await ProfilesRepository.create({ ...data, user_id: user.id }, trx);
      await AvatarProfiles.create({ file_id: fileId, profile_id: profileId }, { client: trx });

      await trx.commit();
      return response.status(201).send({ user });
    } catch (error) {
      await trx.rollback();
      fileSystem.unlinkSync(path.resolve(__dirname, `../../tmp/uploads/${file}`));
      return response.status(error.status | 400).send({ message: error.message } || { error });
    }
  }
}

export class UpdateUser {
  static async execute({ request, response, params, auth }: HttpContextContract): Promise<void> {
    const data = request.body();
    const userId = params.id;

    if (auth.user?.id !== parseInt(userId)) throw new Error(`User ${userId} does not match`);

    const trx = await Database.transaction();

    try {
      const oldUser = await UsersRepository.findOne(userId);

      const newUser = await UsersRepository.update(trx, userId, data);

      await trx.commit();
      return response.status(200).send({});
    } catch (error) {
      await trx.rollback();
      return response.status(error.status | 400).send({ error });
    }
  }
}

export class DeleteUser {
  async execute({ params, response }: HttpContextContract) {
    try {
      await UsersRepository.delete(params.id);
      return response.status(200).send({ message: 'Delete user successfully' });
    } catch (error) {
      return response.status(400).send({ error });
    }
  }
}

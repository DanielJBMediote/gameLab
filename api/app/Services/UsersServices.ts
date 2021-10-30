import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { Exception } from '@poppinss/utils';
import Users from 'App/Models/Users';
import ProfilesRepository from 'App/Repositories/ProfilesRepository';
import UsersRepository from 'App/Repositories/UsersRepository';
import { CreateFile } from './FilesServices';
import { CreateProfile, UpdateProfile } from './ProfilesServices';

export class ReadUser {
  async execute({ params, response }: HttpContextContract): Promise<Users | void> {
    try {
      const user = await UsersRepository.findOne(params.id);
      if (!user) throw new Error('User not found')
      return response.send(user)
    } catch (error) {
      return response.status(400).send({message: error.message});
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

    try {
      const user = await UsersRepository.create(data, trx);

      const file = await CreateFile.execute(request, trx);
      // const profile = await CreateProfile.execute(data, trx);

      // profile.file_id = file.id;
      // await profile.save();

      // user.profile_id = profile.id;
      // await user.save();
      // await UpdateProfile.execute({ file_id: file.id }, profile?.id, trx)


      await trx.commit();
      return response.status(201).send({ user });
    } catch (error) {
      await trx.rollback();
      return response.status(error.status | 400).send({ error });
    }
  }
}

export class UpdateUser {
  async execute(data: Record<string, any>, { response, auth }: HttpContextContract): Promise<void> {
    const user = await UsersRepository.findOne(auth.user!.id);
    const trx = await Database.transaction();

    try {
      if (!user) {
        throw new Exception('User not found', 400);
      }

      if (!(await UsersRepository.update(trx, user!.id, data)))
        throw new Exception('Failed to update User', 400);
      if (!(await ProfilesRepository.update(trx, user!.id, data)))
        throw new Exception('Failed to update Profile', 400);

      await trx.commit();
    } catch (error) {
      await trx.rollback();
      return response.status(error.status | 400).send({ error });
    }
    return response.status(200).send({ message: 'User has been updated successfully' });
  }
}

export class DeleteUser {
  async execute({ auth, response }: HttpContextContract) {
    try {
      await UsersRepository.delete(auth.user!.id);
      return response.status(200).send({ message: 'Delete user successfully' });
    } catch (error) {
      return response.status(400).send({ error });
    }
  }
}

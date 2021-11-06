import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import AvatarProfiles from 'App/Models/AvatarProfiles';
import FilesRepository from 'App/Repositories/FilesRepository';
import ProfilesRepository from 'App/Repositories/ProfilesRepository';
/**
 * Service for ProfilesService with a basic CRUD
 */
export class ReadProfile {
  static async execute({ params, response }: HttpContextContract) {
    if (params.id) {
      await this.getByID({ params, response } as HttpContextContract);
    }
    if (params.username) {
      await this.getByUsername({ params, response } as HttpContextContract);
    }
  }

  private static async getByID({ params, response }: HttpContextContract) {
    try {
      const profile = await ProfilesRepository.findBy('id', params.id);
      if (!profile) throw new Error(`Could not find profile with id ${params.id}`);
      return response.status(200).send({ profile });
    } catch (error) {
      return response.status(error.status || 400).send({ message: error.message } || error);
    }
  }

  private static async getByUsername({ params, response }: HttpContextContract) {
    try {
      const profile = await ProfilesRepository.findBy('username', params.username);
      if (!profile) throw new Error(`Could not find profile with username ${params.username}`);
      return response.status(200).send({ profile });
    } catch (error) {
      return response.status(error.status || 400).send({ message: error.message } || error);
    }
  }
}

export class CreateProfile {
  static async execute({}: HttpContextContract) {}
}

export class UpdateProfile {
  static async execute(data: Record<string, any>, id: number, trx: TransactionClientContract) {
    try {
      return await ProfilesRepository.update(trx, id, data);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export class DeleteProfile {
  static async execute({}: object) {}
}

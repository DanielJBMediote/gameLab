import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from '@poppinss/utils'
import Users from 'App/Models/Users'
import ProfilesRepository from 'App/Repositories/ProfilesRepository'
import UsersRepository from 'App/Repositories/UsersRepository'

export class ReadUser {
  async execute(id: number): Promise<Users | null> {
    return await UsersRepository.findOne(id)
  }

  async executeFindByUsername({ response, params }: HttpContextContract): Promise<void> {
    try {
      const user = await UsersRepository.findBy('username', params.username)
      if (user) {
        throw new Error('User already exists')
      }
      return response.status(200).send('Username can be use')
    } catch (error) {
      return response.status(404).send({ error })
    }
  }
}

/**
 * Read all from database
 */
export class ReadAllUser {
  /**
   * Execute to list all users from database
   * @returns Users
   */
  async execute(): Promise<Users[]> {
    return await UsersRepository.findAll()
  }
}

export class CreateUser {
  /**
   *
   * @param HttpContextContract
   * @returns User and Profile stored
   */
  async execute({ request, response }: HttpContextContract) {
    const { name, email, password, username } = request.body()
    const trx = await Database.transaction()

    try {
      const user = await UsersRepository.create(trx, { name, email, password })
      if (!user) throw new Exception('Failed to create user', 400)
      const profile = await ProfilesRepository.create(trx, { username }, user)
      if (!profile) throw new Exception('Failed to create profile', 400)

      await trx.commit()
      return response.status(201).send({ profile, user })
    } catch (err) {
      await trx.rollback()
      return response.status(err.status | 400).send({ err })
    }
  }
}

export class UpdateUser {
  async execute(data: Record<string, any>, { response, auth }: HttpContextContract): Promise<void> {
    const user = await UsersRepository.findOne(auth.user!.id)
    const trx = await Database.transaction()

    try {
      if (!user) {
        throw new Exception('User not found', 400)
      }

      if (!(await UsersRepository.update(trx, user!.id, data)))
        throw new Exception('Failed to update User', 400)
      if (!(await ProfilesRepository.update(trx, user!.id, data)))
        throw new Exception('Failed to update Profile', 400)

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      return response.status(error.status | 400).send({ error })
    }
    return response.status(200).send({ message: 'User has been updated successfully' })
  }
}

export class DeleteUser {
  async execute({ auth, response }: HttpContextContract) {
    try {
      await UsersRepository.delete(auth.user!.id)
      return response.status(200).send({ message: 'Delete user successfully' })
    } catch (error) {
      return response.status(400).send({ error })
    }
  }
}

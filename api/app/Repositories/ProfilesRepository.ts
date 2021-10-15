import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import Profiles from 'App/Models/Profiles'
import Users from 'App/Models/Users'

interface IProfile {
  username?: string
  status?: string
  is_online?: boolean
}

export default class ProfilesRepository {
  static async create(
    trx: TransactionClientContract,
    { username }: IProfile,
    user: Users
  ): Promise<Profiles> {
    return await Profiles.create(
      {
        username,
        status: 'online',
        user_id: user.id,
      },
      { client: trx }
    )
  }

  static async update(trx: TransactionClientContract, userId: number, data: IProfile) {
    return await Profiles.query({ client: trx }).where('user_id', userId).update({
      username: data?.username,
    })
  }
}

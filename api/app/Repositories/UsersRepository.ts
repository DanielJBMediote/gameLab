import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import Users from 'App/Models/Users'

interface IUserData {
  fullname?: string
  email?: string
  password?: string
}

export default class UsersRepository {
  static async findBy(type: string, value: any): Promise<Users | null> {
    return await Users.findByOrFail(type, value)
  }
  static async findAll() {
    return await Users.query()
  }

  static async findOne(id: number | undefined): Promise<Users | null> {
    return await Users.find(id)
  }

  static async create(
    trx: TransactionClientContract,
    data: { fullname: string; email: string; password: string }
  ): Promise<Users> {
    return await Users.create(data, { client: trx })
  }

  static async update(
    trx: TransactionClientContract,
    id: number,
    data: IUserData
  ) {
    const user = await Users.findOrFail(id)

    user.merge(data)

    user.useTransaction(trx)
    return user.save()
  }

  static async delete(id: number) {
    return (await Users.findOrFail(id)).delete()
  }
}

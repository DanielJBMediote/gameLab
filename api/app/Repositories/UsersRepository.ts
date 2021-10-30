import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Users from 'App/Models/Users';
import lodash from 'lodash';

export default class UsersRepository {
  
  private static fillable = [
    'email',
    'password'
  ]
  
  static async findBy(field: string, value: any): Promise<Users | null> {
    return await Users.findByOrFail(field, value);
  }
  static async findAll() {
    return await Users.query();
  }

  static async findOne(id: number): Promise<Users | null> {
    const user =  await Users.find(id)
    await user?.load('profile', query => {
      query.preload('avatar')
    })
    return user
  }

  static async create(data: Record<string, any>, trx: TransactionClientContract): Promise<Users> {
    const user = new Users();
    const newData = lodash.pick(data, this.fillable);
    
    user.fill({...newData});
    user.useTransaction(trx);

    return await user.save();
  }

  static async update(trx: TransactionClientContract, id: number, data: Record<string,any>) {
    const user = await Users.findOrFail(id);
    const newData = lodash.pick(data, this.fillable);

    user.merge({...newData});
    user.useTransaction(trx);

    return user.save();
  }

  static async delete(id: number) {
    return (await Users.findOrFail(id)).delete();
  }
}

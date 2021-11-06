import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Profiles from 'App/Models/Profiles';
import lodash from 'lodash';

export default class ProfilesRepository {
  private static fillable = ['fullname', 'username', 'avatar_id', 'user_id'];

  static async findBy(field: string, value: string): Promise<Profiles | null> {
    const profile = await Profiles.findBy(field, value);
    await profile?.load('user');
    await profile?.load('avatar', (query) => {
      query.preload('file');
    });
    return profile;
  }

  static async create(
    data: Record<string, any>,
    trx: TransactionClientContract
  ): Promise<Profiles> {
    const newData = lodash.pick(data, this.fillable);
    const profile = new Profiles();
    console.log(newData);

    profile.fill({ status: 'online', ...newData });
    profile.useTransaction(trx);

    return await profile.save();
  }

  static async update(trx: TransactionClientContract, id: number, data: Record<string, any>) {
    const newData = lodash.pick(data, this.fillable);
    const profile = await Profiles.find(id);

    if (profile) {
      profile.merge({ ...newData });
      profile.useTransaction(trx);
      return await profile.save();
    }
    return;
  }
}

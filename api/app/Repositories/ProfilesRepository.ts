import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Profiles from 'App/Models/Profiles';
import lodash from 'lodash';

export default class ProfilesRepository {
  private static fillable = ['fullname', 'username', 'status', 'is_online', 'file_id'];

  static async findBy(field: string, value: string): Promise<Profiles | null> {
    const profile = await Profiles.findBy(field, value);
    await profile?.load('avatar');
    return profile;
  }

  static async create(
    trx: TransactionClientContract,
    data: Record<string, any>
  ): Promise<Profiles> {
    const newData = lodash.pick(data, this.fillable);
    const profile = new Profiles();

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

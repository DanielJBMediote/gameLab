import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Files from 'App/Models/Files';
import lodash from 'lodash';

export default class FilesRepository {
  private static fillable = ['filename',
                             'subtype',
                             'extname',
                             'size',
                             'clientname',
                             'type'];

  static async findOne(id: number): Promise<Files | null> {
    return await Files.find(id);
  }

  static async create(data: Record<string, any>, trx: TransactionClientContract) {
    const file = new Files();
    const newData = lodash.pick(data, this.fillable);
    console.log(newData);

    file.fill({ ...newData });
    file.useTransaction(trx);

    return await file.save();
  }

  static async update(trx: TransactionClientContract, id: number, data: Record<string, any>) {
    const file = await Files.findOrFail(id);
    const newData = lodash.pick(data, this.fillable);

    file.merge(newData);
    file.useTransaction(trx);

    return await file.save();
  }

  static async destroy(trx: TransactionClientContract, id: number) {
    return (await Files.findOrFail(id, { client: trx })).delete();
  }
}

import { DateTime } from 'luxon';
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Users from 'App/Models/Users';

export default class Rooms extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public password: string;

  @column()
  public owner_id: number;

  @hasOne(() => Users)
  public user: HasOne<typeof Users>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Users from './Users';

export default class SessionTokens extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public type: string;

  @column()
  public token: string;

  @hasOne(() => Users)
  public user: HasOne<typeof Users>;

  @column()
  public user_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

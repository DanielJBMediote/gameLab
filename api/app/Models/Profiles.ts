import { BaseModel, beforeCreate, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import AvatarProfiles from 'App/Models/AvatarProfiles';
import Users from 'App/Models/Users';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

export default class Profiles extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uuid: string;

  @hasOne(() => Users, { foreignKey: 'id', localKey: 'user_id' })
  public user: HasOne<typeof Users>;

  @hasOne(() => AvatarProfiles, { foreignKey: 'profile_id', localKey: 'id' })
  public avatar: HasOne<typeof AvatarProfiles>;

  @column()
  public user_id: number;

  @column()
  public avatar_id: number;

  @column()
  public username: string;

  @column()
  public fullname: string;

  @column()
  public is_active: boolean;

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async storeUuid(profile: Profiles) {
    profile.uuid = uuid();
  }
}

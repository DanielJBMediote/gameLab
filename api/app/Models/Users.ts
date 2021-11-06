import Hash from '@ioc:Adonis/Core/Hash';
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import Profiles from 'App/Models/Profiles';
import Rooms from 'App/Models/Rooms';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fullname: string;

  @column()
  public email: string;

  @column()
  public uuid: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public reset_password_token: string;

  @belongsTo(() => Profiles, { foreignKey: 'id' })
  public profile: BelongsTo<typeof Profiles>;

  @hasMany(() => Rooms, { foreignKey: 'id' })
  public rooms: HasMany<typeof Rooms>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(users: Users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password);
    }
  }

  @beforeCreate()
  public static async storeUuid(users: Users) {
    users.uuid = uuid();
  }
}

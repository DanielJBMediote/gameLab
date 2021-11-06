import { BaseModel, BelongsTo, belongsTo, hasOne, HasOne, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import Profiles from 'App/Models/Profiles';
import Files from 'App/Models/Files';

export default class AvatarProfiles extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public file_id: number;

  @column()
  public profile_id: number;

  @hasOne(() => Files, { foreignKey: 'id', localKey: 'file_id' })
  public file: HasOne<typeof Files>;

  @belongsTo(() => Profiles)
  public profile: BelongsTo<typeof Profiles>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}

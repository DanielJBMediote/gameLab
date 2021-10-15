import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Users from 'App/Models/Users'

export default class Profiles extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid: string

  @hasOne(() => Users)
  public user: HasOne<typeof Users>

  @column()
  public user_id: number

  @column()
  public username: string

  @column()
  public is_active: boolean

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async storeUuid(profile: Profiles) {
    profile.uuid = uuid()
  }
}

import { BaseModel, beforeFind, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Files extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column()
  public filename: string;

  @column()
  public clientname: string;

  @column()
  public type: string;

  @column()
  public subtype: string;

  @column()
  public extname: string;

  @column()
  public size: number;

  @column()
  public file_subtype: string;

  @column()
  public url: string;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeFind()
  public static async virtualColumn(file: Files) {
    file.url = (process.env.HOST || 'localhost') + process.env.PORT + '/' + file.filename;
  }
}

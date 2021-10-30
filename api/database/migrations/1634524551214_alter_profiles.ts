import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('file_id').references('id').inTable('files').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('file_id')
    })
  }
}

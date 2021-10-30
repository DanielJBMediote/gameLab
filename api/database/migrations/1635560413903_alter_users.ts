import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterUsers extends BaseSchema {
  protected tableName = 'alter_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('profile_id').references('id').inTable('profiles').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('profile_id')
    })
  }
}

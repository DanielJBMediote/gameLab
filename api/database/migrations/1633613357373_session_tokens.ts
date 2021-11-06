import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Tokens extends BaseSchema {
  protected tableName = 'session_tokens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('type').notNullable();
      table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE');
      table.string('token').notNullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

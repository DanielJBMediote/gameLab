import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Notifications extends BaseSchema {
  protected tableName = 'notifications';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uuid');
      table.string('message', 255).notNullable();
      table.boolean('is_readed').defaultTo(false);
      table.integer('user_id').references('id').inTable('users');

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

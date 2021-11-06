import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uuid');
      table.string('fullname', 255).notNullable();
      table.string('username', 255).notNullable().unique();
      table.string('status').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
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

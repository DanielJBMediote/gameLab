import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rooms extends BaseSchema {
  protected tableName = 'rooms';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('uuid');
      table.integer('owner_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('users_limit').notNullable();
      table.string('name');
      table.string('description');
      table.boolean('is_active').defaultTo(true);
      table.string('password')


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

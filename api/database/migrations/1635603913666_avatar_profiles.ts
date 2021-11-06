import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AvatarProfiles extends BaseSchema {
  protected tableName = 'avatar_profiles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('file_id').references('id').inTable('files').onDelete('CASCADE');
      table.integer('profile_id').references('id').inTable('profiles').onDelete('CASCADE');

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

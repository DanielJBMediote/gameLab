import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Users from 'App/Models/Users';

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await Users.create({
      email: 'gamelab@admin.com',
      password: 'g4m3l4b@admin',
    });
  }
}

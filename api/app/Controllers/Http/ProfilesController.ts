import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ReadProfile } from 'App/Services/ProfilesServices';

export default class ProfilesController {
  public async show(ctx: HttpContextContract) {
    return await ReadProfile.execute(ctx);
  }
}

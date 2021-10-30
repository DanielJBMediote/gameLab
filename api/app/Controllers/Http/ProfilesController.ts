import { ReadProfile } from './../../Services/ProfilesServices';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {

  public async show(ctx: HttpContextContract) {
    return await ReadProfile.execute(ctx);
  }

  public async showByUsername(ctx: HttpContextContract) {
    return await ReadProfile.execute(ctx);
  }
}

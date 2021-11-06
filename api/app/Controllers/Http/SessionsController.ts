import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CreateSession, DestroySession } from 'App/Services/SessionsServices';

export default class SessionsController {
  async store(ctx: HttpContextContract) {
    return await new CreateSession().execute(ctx);
  }

  async destroy(ctx: HttpContextContract) {
    return await new DestroySession().execute(ctx);
  }

  async index({}: HttpContextContract) {}
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateSession, DestorySession } from 'App/Services/SessionService'

export default class SessionsController {
  async store(ctx: HttpContextContract) {
    return await new CreateSession().execute(ctx)
  }

  async destroy(ctx: HttpContextContract) {
    return await new DestorySession().execute(ctx)
  }

  async index({}: HttpContextContract) {}
}

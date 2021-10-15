import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  CreateUser,
  DeleteUser,
  ReadAllUser,
  ReadUser,
  UpdateUser,
} from 'App/Services/UserProfilesService'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return await new ReadAllUser().execute()
  }

  public async create({}: HttpContextContract) {}

  public async store(ctx: HttpContextContract) {
    return await new CreateUser().execute(ctx)
  }

  public async showByToken({ auth }: HttpContextContract) {
    const user = auth.use('api').user
    return await new ReadUser().execute(user!.id)
  }

  public async showByUsername(ctx: HttpContextContract) {
    return await new ReadUser().executeFindByUsername(ctx)
  }

  public async show({ params }: HttpContextContract) {
    return await new ReadUser().execute(params.id)
  }

  public async edit({}: HttpContextContract) {}

  public async update(ctx: HttpContextContract) {
    const data = ctx.request.body()
    return await new UpdateUser().execute(data, ctx)
  }

  public async destroy(ctx: HttpContextContract) {
    return await new DeleteUser().execute(ctx)
  }
}

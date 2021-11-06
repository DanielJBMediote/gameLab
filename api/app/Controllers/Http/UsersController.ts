import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {
  CreateUser,
  DeleteUser,
  ReadAllUser,
  ReadUser,
  UpdateUser
} from 'App/Services/UsersServices';

export default class UsersController {
  async logged(ctx: HttpContextContract) {
    return await new ReadUser().getByToken(ctx);
  }

  public async index({}: HttpContextContract) {
    return await new ReadAllUser().execute();
  }

  public async store(ctx: HttpContextContract) {
    return await CreateUser.execute(ctx);
  }

  public async show(ctx: HttpContextContract) {
    return await new ReadUser().execute(ctx);
  }

  public async update(ctx: HttpContextContract) {
    return await UpdateUser.execute(ctx);
  }

  public async destroy(ctx: HttpContextContract) {
    return await new DeleteUser().execute(ctx);
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ReadFile } from 'App/Services/FilesServices';

export default class FilesController {
  public async index({ }: HttpContextContract) { }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show(ctx: HttpContextContract) {
    return await ReadFile.execute(ctx);
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@poppinss/utils';
import * as jwt from 'jsonwebtoken';

export default class AuthJWTMiddleware {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    try {
      const token = request.headers().authorization?.replace('Bearer ', '');

      if (!token) {
        throw new Exception('Token is required for authentication', 401);
      }

      if (jwt.verify(token, 'secretKey')) {
        await auth.authenticate();
      }
    } catch (e: any) {
      return response.status(e.status | 400).send({ message: e.message });
    }
    await next();
  }
}

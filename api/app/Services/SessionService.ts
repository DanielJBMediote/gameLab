import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/**
 * Service for SessionService
 */

export class CreateSession {
  public async execute({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.body()

    try {
      if (email === '' || password === '') throw new Error('Invalid email or password')

      return await auth.use('api').attempt(email, password)
    } catch (err: any) {
      if (err instanceof Error) {
        err.message = 'Invalid credentials.'
      }
      return response.status(err.status).send({
        error: {
          msg: err.message,
          code: err.code,
        },
      })
    }
  }
}

export class DestorySession {
  public async execute({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()
      return await auth.use('api').logout()
    } catch (error) {
      return response.status(error.status | 400).send({ message: error.message })
    }
  }
}

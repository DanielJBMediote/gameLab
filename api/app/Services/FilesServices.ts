import Application from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RequestContract } from '@ioc:Adonis/Core/Request';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import FilesRepository from 'App/Repositories/FilesRepository';


export class ReadFile {
  static async execute({ params, response }: HttpContextContract) {
    const file = await FilesRepository.findOne(params.id)

    try {
      // const image = await fs.createReadStream(file?.filename)
      const filePath = Application.tmpPath(`uploads/${file?.filename}`)
      return response.attachment(filePath)
    } catch (error) {
      return response.status(404).send(error);
    }
  }
}

export class CreateFile {
  static async execute(request: RequestContract, trx: TransactionClientContract) {
    const upload = request.file('file', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif'],
    });
    try {
      if (!upload) return;
      if (!upload?.isValid) throw new Error(upload?.errors[0].message);
      let filename = Date.now().toString() + "."+upload.extname;
      const file = await FilesRepository.create(trx, {
        filename,
        clientname: upload.clientName,
        ...upload,
      });
      await upload.move(Application.tmpPath('uploads'), {
        name: filename,
      });
      return file;
    } catch (error) {
      return error;
    }
  }
}

import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'
import fs from 'fs'
import path from 'path'
// import Helpers from '@ioc:Adonis/Core/Helpers'

export default class ServiceCommand extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:service'
  /**
   * Command description is displayed in the "help" output
   */

  public static description = 'Make a new service file'

  @flags.boolean({
    name: 'repository',
    description: 'Create a new repository',
    alias: 'r',
  })
  public repository: boolean

  @args.string({
    name: 'name',
    description: 'Name of the service file like: ServiceName',
  })
  public name: string

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    const serviceName = await this.checkServiceName(this.name)
    const repositoryName = await this.checkRepositoryName(this.name)

    this.logger.await('Creating ' + serviceName)

    const serviceFile = serviceName + '.ts'
    const repositoryFile = repositoryName + '.ts'

    const appRoot = path.resolve(__dirname + '../..')

    if (this.repository) {
      if (!fs.existsSync(appRoot + '/app/Repositories/'))
        fs.mkdirSync(appRoot + '/app/Repositories/')

      fs.writeFileSync(
        appRoot + '/app/Repositories/' + repositoryFile,
        this.repositoryTemplate(repositoryName)
      )
      this.logger.success(repositoryName + ' has been created in ' + appRoot + '/app/Repositories/')
    }

    if (!fs.existsSync(appRoot + '/app/Services/')) fs.mkdirSync(appRoot + '/app/Services/')
    fs.writeFileSync(
      appRoot + '/app/Services/' + serviceFile,
      this.serviceTemplate(serviceName, repositoryName)
    )
    this.logger.success(serviceName + ' has been created in' + appRoot + '/app/Services/')
  }

  public async checkRepositoryName(stringName: string) {
    if (stringName.includes('service')) stringName = stringName.replace('service', '')
    if (stringName.includes('Service')) stringName = stringName.replace('Service', '')

    return await this.capitalizeString(stringName + 'Repository')
  }

  public async checkServiceName(stringName: string) {
    if (stringName.includes('service'))
      return await this.capitalizeString(stringName.replace('service', 'Service'))
    else if (stringName.includes('Service'))
      return await this.capitalizeString(stringName)
    else
      return await this.capitalizeString(stringName + 'Service')
  }

  public async capitalizeString(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  private repositoryTemplate(repositoryName: string): string {
    return `
    /**
    * Repository for ${repositoryName}
    */
  class ${repositoryName} {}
   
   export { 
     ${repositoryName}
   }
   `
  }

  private serviceTemplate(className: string, repositoryName: string): string {
    let repoLine = ""
    if (this.repository)
      repoLine = `import { ${repositoryName} } from 'App/Repositories/${repositoryName}'`
    return `
${repoLine}

 /**
 * Service for ${className} with a basic CRUD
 */
class Read${className} {
  async execute({}: object) {}
}

class Create${className} {
  async execute({}: object) {}
}

class Update${className} {
  async execute({}: object) {}
}

class Delete${className} {
  async execute({}: object) {}
}

export { 
  Read${className},
  Create${className},
  Update${className},
  Delete${className},
}
`
  }
}

import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone';
import fileSystem from 'fs';
import path from 'path';
// import Helpers from '@ioc:Adonis/Core/Helpers'

export default class ServiceCommand extends BaseCommand {
  
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:service';
  /**
   * Command description is displayed in the "help" output
   */

  public static description = 'Make a new service file';

  @flags.boolean({
    name: 'repository',
    description: 'Create a new repository',
    alias: 'r',
  })
  public repository: boolean;

  @args.string({
    name: 'name',
    description: 'Name of the service file like: ServiceName',
  })
  public name: string;

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
  };

  public async run() {
    await this.handleService();
    if (this.repository) await this.handleRepository();
  }

  public async handleService() {
    const appRoot = path.resolve(__dirname + '../..');
    let name = this.name;

    if (name.includes('service' || 'services')) {
      name = this.capitalizeString(name.replace('service', 'Services'));
    } else if (name.includes('Service')) {
      name = this.capitalizeString(name);
    }
    name = this.capitalizeString(name + 'Services');

    const fileName = name + '.ts';

    if (!fileSystem.existsSync(appRoot + '/app/Services/')) fileSystem.mkdirSync(appRoot + '/app/Services/');
    fileSystem.writeFileSync(
      appRoot + '/app/Services/' + fileName,
      this.serviceTemplate(name.replace('Services', ''))
    );
    
    this.logger.success(fileName + ' has been created in /App/Repositories/');
  }

  public async handleRepository() {
    const appRoot = path.resolve(__dirname + '../..');
    let name = this.name;
    
    if (name.includes('service' || 'services'))
      name = name.replace('service', '');
    if (name.includes('Service' || 'Services'))
      name = name.replace('Service', '');
    name = this.capitalizeString(name + 'Repository');

    const fileName = name +".ts"

    if (!fileSystem.existsSync(appRoot + '/app/Repositories/'))
      fileSystem.mkdirSync(appRoot + '/app/Repositories/');

    fileSystem.writeFileSync(
      appRoot + '/app/Repositories/' + fileName,
      this.repositoryTemplate(name));
    this.logger.success(fileName + ' has been created in /App/Repositories/');
  }

  public capitalizeString(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private repositoryTemplate(className: string): string {
    return `
    /**
    * Repository for ${className}
    */
  export class ${className} {}
   
   `;
  }

  private serviceTemplate(className: string): string {
    return `
 /**
 * Service for ${className}
 */
export class Read${className} {}
export class Create${className} {}
export class Update${className} {}
export class Delete${className} {}
`;
  }
}

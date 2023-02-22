import { DeepPartial, Service, ServiceParameters } from "@webda/core";

class <%= name %>Parameters extends ServiceParameters {
  constructor(params: any) {
    super(params);
    // Init default here
  }
}

// Add @WebdaModda to the JSDocs to make it available to your other modules as a Modda
/**
 * A sample service
 * 
 */
// Add @Bean to make a singleton in your applicaiton
export class <%= name %><T extends <%= name %>Parameters = <%= name %>Parameters> extends Service<T> {
    /**
     * Load the paremeters for your service
     * @param params 
     * @param name 
     */
  loadParameters(params: DeepPartial<<%= name %>Parameters>): <%= name %>Parameters {
    return new <%= name %>Parameters(params);
  }
  /**
   * Your service is now created as all the other services
   */
  resolve(): this {
    super.resolve();
    // You can retrieve another bean by calling this.getService('beanName');
    return this;
  }

  /**
   * Init method for your service
   * @param params define in your webda.config.json
   * @returns {Promise<this>}
   */
  async init(): Promise<this> {
    await super.init();
    // You can run any async action to get your service ready
    return this;
  }
}

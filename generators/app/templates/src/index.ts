import { Service, ServiceParameters, CoreModel } from "@webda/core";

class MyServiceParameters extends ServiceParameters {
  constructor(params: any) {
    super(params);
    // Init default here
  }
}

/**
 * A sample service
 */
export class MyService<T extends MyServiceParameters = MyServiceParameters> extends Service<T> {
  /**
   * Your service is now created as all the other services
   */
  resolve(): void {
    super.resolve();
    // You can retrieve another bean by calling this.getService('beanName');
  }

  /**
   * Init method for your service
   * @param params define in your webda.config.json
   * @returns {Promise<void>}
   */
  async init(): Promise<void> {
    await super.init();
    // You can run any async action to get your service ready
  }
}

/**
 * Define here a model that can be used along with Store service
 */
export class MyModel extends CoreModel {
  /**
   * Call to check if action is available for the current user
   * @param ctx the context of the request
   * @param {string} action the type of action
   * @returns {Promise<void>}
   * @throws Exception if the action is not available to the user
   */
  async canAct(ctx, action: string) {
    if (action === "myAction") {
      // Sending directly a 403 code to the browser
      throw 403;
    }
  }
}

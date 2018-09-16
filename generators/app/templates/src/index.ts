import { Service, Executor, CoreModel } from 'webda';

/**
 * A sample service
 */
class MyService extends Service {

  /**
   *
   */
  normalizeParams() {
    super.normalizeParams();
    // You can default fallback on some params. They are read from webda.config.json and can be overwrite by a configuration service
  }

  /**
   * Your service is now created as all the other services
   */
  resolve() : void {
    super.resolve();
    // You can retrieve another bean by calling this.getService('beanName');
  }

  /**
   * Init method for your service
   * @param params define in your webda.config.json
   * @returns {Promise<void>}
   */
  async init() : Promise<void> {
    await super.init();
    // You can run any async action to get your service ready
  }
}

/**
 * A sample executor.
 *
 * An executor is a service that expose some routes
 * Executor extends Service and has all the above methods too
 *
 */
class MyExecutor extends Executor {
  initRoutes() {
    super.initRoutes();
    // You can add new route here by calling _addRoute()
  }
}

/**
 * Define here a model that can be used along with Store service
 */
class MyModel extends CoreModel {

  /**
   * Call to check if action is available for the current user
   * @param ctx the context of the request
   * @param {string} action the type of action
   * @returns {Promise<void>}
   * @throws Exception if the action is not available to the user
   */
  async canAct(ctx, action : string) {
    if (action === 'myAction') {
      // Sending directly a 403 code to the browser
      throw 403;
    }
  }
}

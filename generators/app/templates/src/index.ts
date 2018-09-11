import { Service } from 'webda';

/**
 * A sample service
 */
class MyService extends Service {

  /**
   * Init method for your service
   * @param params define in your webda.config.json
   * @returns {Promise<void>}
   */
  async init(params: any) : Promise<void> {
    await super.init(params);
    // You can retrieve another bean by calling this.getService('beanName');
  }
}

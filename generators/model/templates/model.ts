import { CoreModel } from "@webda/core";

/**
 * Define here a model that can be used along with Store service
 */
export class <%= name %> extends CoreModel {
    /**
     * Call to check if action is available for the current user
     * @param ctx the context of the request
     * @param {string} action the type of action
     * @returns {Promise<void>}
     * @throws Exception if the action is not available to the user
     */
    async canAct(ctx, action: string): Promise<this> {
      if (action === "myAction") {
        // Sending directly a 403 code to the browser
        throw 403;
      }
      return this;
    }
}
  
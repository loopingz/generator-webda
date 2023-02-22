"use strict";
const Generator = require("../webda");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.logo([`Welcome to webda application generator`, "", "https://webda.io"]);
    if (this.fs.exists(this.destinationPath("package.json"))) {
      this.log("This generator can only be run in an empty folder");
      throw new Error("Not in a monorepo project");
    }
    const prompts = [
      {
        type: "string",
        name: "name",
        message: "Your module name",
        default: this._getName()
      },
      {
        type: "string",
        name: "description",
        message: "Your module description"
      }
    ];
    this.answers = await this.prompt(prompts);

    this.composeWith(require.resolve("../module"), { ...this.answers, module: true });
    this.composeWith(require.resolve("../ci"), { ...this.answers, module: true });
  }

  async writing() {}
};

"use strict";
const Generator = require("../webda");
const packageJson = require("package-json");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.logo(["Welcome to webda mono repo generator", "", "https://webda.io"]);

    const prompts = [
      {
        type: "string",
        name: "name",
        message: "Your repo name",
        default: this._getName()
      },
      {
        type: "string",
        name: "version",
        message: "Version",
        default: "1.0.0"
      },
      {
        type: "string",
        name: "description",
        message: "Description"
      },
      {
        type: "string",
        name: "keywords",
        message: "Keywords (separate by comma)",
        default: "webda-module"
      }
    ];

    this.answers = await this.prompt(prompts);
    this.composeWith(require.resolve("../ci"), { ...this.answers, module: true });
  }

  /**
   * Auto-update all deps of package
   * @param {*} pkg
   */
  async autoUpdate(pkg) {
    if (!pkg) {
      return;
    }
    for (let p in pkg.devDependencies) {
      pkg.devDependencies[p] = `^${(await packageJson(p)).version}`;
    }
    for (let p in pkg.dependencies) {
      pkg.dependencies[p] = `^${(await packageJson(p)).version}`;
    }
  }

  async writing() {
    const pkg = this.fs.readJSON(this.templatePath("package.json.tpl"), {});
    pkg.name = this.answers.name;
    pkg.version = this.answers.version;
    pkg.description = this.answers.description;
    pkg.keywords = this.answers.keywords.split(",");

    await this.autoUpdate(pkg);
    this.fs.copy(this.templatePath("**"), this.destinationPath(""), {
      globOptions: {
        ignore: ["package.json.tpl"]
      }
    });

    this.fs.writeJSON(this.destinationPath("package.json"), pkg);

    this.fs.mk6
    // globOptions.ignore seems to not work
    this.fs.delete(this.destinationPath("package.json.tpl"));
  }
};

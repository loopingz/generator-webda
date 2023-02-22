"use strict";
const Generator = require("../webda");
const packageJson = require("package-json");
const path = require("path");

module.exports = class extends Generator {
  async initializing() {
    // Check
  }

  async prompting() {
    let type = "monorepo module";
    let target = "./";
    if (this.fs.exists(this.destinationPath("package.json"))) {
      const pkg = this.fs.readJSON(this.destinationPath("package.json"));
      if (!pkg.workspaces) {
        this.log("This generator can only be run in a monorepo project or in an empty folder");
        throw new Error("Not in a monorepo project");
      }
      target = path.dirname(pkg.workspaces.filter(p => p.endsWith("*")).pop() || target);
    } else {
      type = "module";
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
        message: "Description"
      },
      {
        type: "string",
        name: "version",
        message: "Version",
        default: "1.0.0"
      },
      {
        type: "string",
        name: "keywords",
        message: "Keywords (separate by comma)",
        default: "webda-module"
      },
      {
        type: "confirm",
        name: "module",
        message: "Do you want to create a module?",
        default: type !== "module"
      }
    ];
    if (!this.options.name) {
      this.logo([`Welcome to webda ${type} generator`, "", "https://webda.io"]);
      this.answers = await this.prompt(prompts);
      this.answers.target = path.join(target, this.answers.name);
    } else {
      this.answers = await this.prompt(prompts.slice(2));
      this.answers.name = this.options.name;
      this.answers.description = this.options.description;
      this.answers.target = target;
    }

    this.answers.type = type;
    if (type === "module") {
      this.composeWith(require.resolve("../service"), ["SampleService"], { nogreet: true });
      this.composeWith(require.resolve("../model"), ["SampleModel"], { nogreet: true });
    }
  }

  async writing() {
    const pkg = this.fs.readJSON(this.templatePath("package.json.tpl"), {});
    // Copy information for mono repo project
    if (this.answers.type !== "module") {
      const srcPkg = this.fs.readJSON(this.destinationPath("package.json"), {});
      // Copy github info
      pkg.bugs ??= srcPkg.bugs;
      pkg.homepage ??= srcPkg.homepage;
      pkg.repository ??= srcPkg.repository;
      pkg.license ??= srcPkg.license;
      if (srcPkg.devDependencies.prettier) {
        pkg.devDependencies.prettier ??= srcPkg.devDependencies.prettier;
        pkg.scripts.lint ??= srcPkg.scripts.lint;
        pkg.scripts["lint:fix"] ??= srcPkg.scripts["lint:fix"];
      }
    }
    pkg.name = this.answers.name;
    pkg.version = this.answers.version;
    pkg.description = this.answers.description;
    pkg.keywords = this.answers.keywords.split(",");
    if (pkg.keywords.indexOf("webda-module") < 0) {
      pkg.keywords.push("webda-module");
    }

    await this.autoUpdate(pkg);

    this.fs.copy(this.templatePath("**"), this.destinationPath(this.answers.target), {
      globOptions: {
        ignore: ["**/package.json.tpl"]
      }
    });
    // Overwrite tsconfig if a root one exists
    if (this.answers.type !== "module" && this.fs.exists("tsconfig.json")) {
      this.fs.copy(
        this.destinationPath("tsconfig.json"),
        this.destinationPath(path.join(this.answers.target, "tsconfig.json"))
      );
    }
    this.fs.copyTpl(
      this.templatePath(".mocharc.json"),
      this.destinationPath(path.join(this.answers.target, ".mocharc.json")),
      this.answers
    );
    this.fs.writeJSON(this.destinationPath(path.join(this.answers.target, "package.json")), pkg);
    if (this.answers.module) {
      this.fs.delete(this.destinationPath(path.join(this.answers.target, "webda.config.json")));
    }
    // globOptions.ignore seems to not work
    this.fs.delete(this.destinationPath(path.join(this.answers.target, "package.json.tpl")));
  }
};

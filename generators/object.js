"use strict";
const Generator = require("./webda");
const packageJson = require("package-json");
const path = require("path");

module.exports = objectType =>
  class extends Generator {
    constructor(args, options, features) {
      super(args, options, features);
      this.argument("name", { type: String, required: false }).argument("path", {
        type: String,
        required: false
      });
    }

    async prompting() {
      // Have Yeoman greet the user.
      if (!this.options.nogreet) {
        this.logo([`Welcome to webda ${objectType} generator`, "", "https://webda.io"]);
      }
      const defaultPathValue = `src/${objectType.toLowerCase()}s`;
      if (this.arguments.length === 0) {
        this.answers = await this.prompt([
          {
            type: "string",
            name: "name",
            message: `Your ${objectType} name`
          },
          {
            type: "string",
            name: "path",
            message: `Your ${objectType.toLowerCase()} path`,
            default: defaultPathValue
          }
        ]);
      } else {
        this.answers = {
          name: this.arguments[0]
        };
      }
      this.answers.path ??= this.arguments[1] || defaultPathValue;
    }

    async writing() {
      [".spec.ts", ".ts"].forEach(ext => {
        const file = `${objectType.toLowerCase()}${ext}`;
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(
            path.join(this.answers.path, this.answers.name.toLowerCase() + file.substring(objectType.length))
          ),
          this.answers
        );
      });
      // Add default export
      if (this.fs.exists(this.destinationPath("src/index.ts"))) {
        this.fs.append(
          this.destinationPath("src/index.ts"),
          `export * from "./${this.answers.path.substring(4)}/${this.answers.name.toLowerCase()}.ts";`
        );
      }
    }
  };

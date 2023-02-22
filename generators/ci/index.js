"use strict";
const Generator = require("../webda");
const packageJson = require("package-json");

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: "confirm",
        name: "github",
        message: "Would you like to publish on GitHub?"
      },
      {
        type: "confirm",
        name: "sonar",
        message: "Would you like to enable SonarCloud.io?"
      },
      {
        type: "confirm",
        name: "codecov",
        message: "Would you like to enable codecov?"
      },
      {
        type: "confirm",
        name: "githubAction",
        message: "Would you like to use GitHub Action?"
      },
      {
        type: "confirm",
        name: "npm",
        message: "Would you like to publish on npm on tags?"
      },
      {
        type: "confirm",
        name: "prettier",
        message: "Do you want to use prettier?",
        default: true
      },
      {
        type: "confirm",
        name: "husky",
        message: "Do you want to use husky?",
        default: true,
        store: true
      },
      {
        type: "confirm",
        name: "typedoc",
        message: "Do you want to use typedoc?",
        default: true,
        store: true
      }
    ];
    this.answers = await this.prompt(prompts);
    this.answers.description = this.options.description || "";
    this.answers.name = this.options.name;
    if (this.answers.sonar) {
      this.answers.sonar = await this.prompt([
        {
          type: "string",
          name: "orga",
          message: "Your sonarcloud organisation",
          store: true
        }
      ]);
    }
    if (this.answers.npm) {
      this.answers.npm = await this.prompt([
        {
          type: "string",
          name: "email",
          message: "Your npm email",
          store: true
        }
      ]);
    }
    if (this.answers.github) {
      this.answers.github = await this.prompt([
        {
          type: "string",
          name: "repo",
          message: "Repository (format: username/repo)",
          store: true
        }
      ]);
      if (this.answers.typedoc) {
        this.answers.ghPages = await this.prompt([
          {
            type: "confirm",
            name: "ghPages",
            message: "Do you want to use github-pages for documentation",
            store: true
          }
        ]);
      }
    }
  }

  async writing() {
    const pkg = this.fs.readJSON(this.destinationPath("package.json"), {});
    const typedoc = this.fs.readJSON(this.templatePath("typedoc.json"), {});
    if (this.answers.github) {
      let github = this.answers.github;
      pkg.bugs = { url: `https://github.com/${github.repo}/issues` };
      pkg.homepage = `https://github.com/${github.repo}#readme`;
      pkg.repository = {
        type: "git",
        url: `git+https://github.com/${github.repo}.git`
      };
    }
    if (this.answers.prettier) {
      pkg.devDependencies.prettier = "0.0.0";
      pkg.devDependencies["prettier-plugin-organize-imports"] = "^3.0.0";
      pkg.scripts.lint = "prettier --check src/**/*";
      pkg.scripts["lint:fix"] = "prettier --write src/**/*";
    }
    if (this.answers.husky) {
      pkg.devDependencies.husky = "0.0.0";
      pkg.devDependencies["@commitlint/config-conventional"] = "0.0.0";
      pkg.devDependencies.commitlint = "0.0.0";
    }
    if (this.answers.typedoc) {
      pkg.devDependencies.typedoc = "0.0.0";
      pkg.devDependencies["typedoc-loopingz-theme"] = "0.0.0";
      pkg.devDependencies["typedoc-plugin-loopingz-pages"] = "0.0.0";
      pkg.devDependencies["typedoc-plugin-mermaid"] = "0.0.0";
      pkg.scripts["docs"] = "typedoc --packages . --out .built-docs";
    }
    if (this.answers.ghPages) {
      pkg.devDependencies["gh-pages"] = "0.0.0";
      pkg.scripts["docs:publish"] = "yarn docs && gh-pages -t -d .built-docs";
    }
    await this.autoUpdate(pkg);

    this.fs.copy(this.templatePath("**"), this.destinationPath(""), {
      globOptions: {
        ignore: ["typedoc.json"]
      }
    });
    ["sonar-project.properties", "README.md", ".github/workflows/ci.yml"].forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), this.answers);
    });

    this.fs.writeJSON(this.destinationPath("package.json"), pkg);
    if (!this.answers.sonar) {
      this.fs.delete(this.destinationPath("sonar-project.properties"));
    }
    if (!this.answers.githubAction) {
      this.fs.delete(this.destinationPath(".github"));
    }
    if (this.answers.typedoc) {
      typedoc.name = pkg.name;
      this.fs.writeJSON(this.destinationPath("typedoc.json"), typedoc);
    } else {
      this.fs.delete(this.destinationPath("typedoc.json"));
      if (this.answers.githubAction) {
        this.fs.delete(this.destinationPath(".github/workflows/docs.yml"));
      }
    }
    if (!this.answers.husky) {
      this.fs.delete(this.destinationPath(".husky"));
    }
  }
};

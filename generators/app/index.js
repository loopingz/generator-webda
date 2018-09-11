'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the tremendous ${chalk.red('generator-webda')} generator!`));

    const prompts = [
      {
        type: 'string',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'string',
        name: 'version',
        message: 'Version',
        default: '1.0.0'
      },
      {
        type: 'string',
        name: 'description',
        message: 'Description'
      },
      {
        type: 'string',
        name: 'keywords',
        message: 'Keywords (separate by comma)',
        default: 'webda-module'
      },
      {
        type: 'confirm',
        name: 'github',
        message: 'Would you like to publish on GitHub?'
      },
      {
        type: 'confirm',
        name: 'sonar',
        message: 'Would you like to enable SonarCloud.io?'
      },
      {
        type: 'confirm',
        name: 'npm',
        message: 'Would you like to publish on npm on tags?'
      }
    ];

    this.answers = await this.prompt(prompts);
    if (this.answers.sonar) {
      this.answers.sonar = await this.prompt([
        {
          type: 'string',
          name: 'orga',
          message: 'Your sonarcloud organisation',
          store: true
        }
      ]);
    }
    if (this.answers.npm) {
      this.answers.npm = await this.prompt([
        {
          type: 'string',
          name: 'email',
          message: 'Your npm email',
          store: true
        }
      ]);
    }
    if (this.answers.github) {
      this.answers.github = await this.prompt([
        {
          type: 'string',
          name: 'repo',
          message: 'Repository (format: username/repo)',
          store: true
        }
      ]);
    }
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    pkg.name = this.answers.name;
    pkg.version = this.answers.version;
    pkg.description = this.answers.description;
    pkg.keywords = this.answers.keywords.split(',');
    if (pkg.keywords.indexOf('webda-module') < 0) {
      pkg.keywords.push('webda-module');
    }
    if (this.answers.github) {
      let github = this.answers.github;
      pkg.bugs = { url: `https://github.com/${github.repo}/issues` };
      pkg.homepage = `https://github.com/${github.repo}#readme`;
      pkg.repository = {
        type: 'git',
        url: `git+https://github.com/${github.repo}.git`
      };
    }
    this.fs.copy(this.templatePath('**'), this.destinationPath(''));
    ['sonar-project.properties', 'README.md', '.travis.yml'].forEach(file => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), this.answers);
    });

    this.fs.copyTpl(this.templatePath('src/index.ts'), this.destinationPath('src/index.ts'), this.answers);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    if (!this.answers.sonar) {
      this.fs.delete(this.destinationPath('sonar-project.properties'));
    }
  }

  install() {
    this.yarnInstall();
  }
};

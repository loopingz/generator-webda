'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the tremendous ${chalk.red('generator-webda')} generator!`));

    const prompts = [
      {
        type: 'string',
        name: 'name',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('**'), this.destinationPath(''));
    this.fs.copyTpl(this.templatePath('src/index.ts'), this.destinationPath('src/index.ts'), {
      name: this.answers.name
    });
  }

  install() {
    this.installDependencies();
  }
};

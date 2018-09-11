'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-webda:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({ name: 'custom-module' });
  });

  it('creates files', () => {
    assert.file(['tsconfig.json', 'package.json', 'src/index.ts', 'README.md', 'sonar-project.properties', 'LICENSE']);
  });
});

{
  "name": "<%= name %>",
  "version": "<%= version %>",
  "description": "<%= description %>",
  "main": "lib/index.js",
  "type": "module",
  "scripts": {
    "build": "webda build",
    "pretest": "npm run build",
    "test": "c8 mocha --recursive --exit --timeout=100000 src/**/*.spec.ts",
    "test:debug": "mocha --recursive --exit --timeout=100000 src/**/*.spec.ts",
    "new-model": "webda init webda:model",
    "new-service": "webda init webda:service"
  },
  "keywords": [],
  "files": [
    "lib",
    "webda.module.json",
    "package.json"
  ],
  "dependencies": {
    "@types/node": "^14.6.0",
    "@webda/core": ">=2.0.0"
  },
  "devDependencies": {
    "@testdeck/mocha": "^0.3.2",
    "@types/node": "^14.6.0",
    "@webda/shell": ">=2.0.0",
    "c8": "^7.11.3",
    "glob": "^7.1.2",
    "js-beautify": "^1.7.5",
    "mocha": ">=2.2.5",
    "source-map-support": "^0.5.4",
    "ts-node": "^5.0.1",
    "typescript": "^2.8.1"
  },
  "c8": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "report-dir": "./reports",
    "reporter": [
      "html",
      "lcov",
      "json"
    ],
    "exclude": ["**/*.spec.ts", "test/**/*"]
  },
  "webda": {
    "namespace": "MyCompany"
  }
}

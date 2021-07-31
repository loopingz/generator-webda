{
  "name": "<%= name %>",
  "version": "<%= version %>",
  "description": "<%= description %>",
  "main": "lib/index.js",
  "scripts": {
    "build": "tsc && webda module",
    "pretest": "npm run build",
    "test": "nyc mocha --recursive --exit --timeout=100000 -r ../../node_modules/ts-node/register src/**/*.spec.ts src/*.spec.ts",
    "run": "node core"
  },
  "keywords": [],
  "files": [
    "lib",
    "webda.module.json",
    "package.json"
  ],
  "dependencies": {
    "@types/node": "^12.0.0",
    "@webda/core": ">=1.1.0"
  },
  "devDependencies": {
    "@istanbuljs/nyc-config-typescript": "^1.0.1",
    "@types/node": "^9.6.2",
    "glob": "^7.1.2",
    "istanbul": "^1.1.0-alpha.1",
    "js-beautify": "^1.7.5",
    "mocha": ">=2.2.5",
    "nyc": "^11.6.0",
    "remap-istanbul": "^0.11.0",
    "source-map-support": "^0.5.4",
    "ts-node": "^5.0.1",
    "typescript": "^2.8.1"
  },
  "nyc": {
    "extension": [
      ".ts",
      ".tsx",
      ".js"
    ],
    "include": [
      "lib/**/*.js"
    ],
    "reporter": [
      "html",
      "lcov",
      "json"
    ],
    "report-dir": "./reports",
    "all": true
  }
}

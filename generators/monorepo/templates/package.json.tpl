{
  "name": "",
  "private": true,
  "devDependencies": {
    "@commitlint/config-conventional": "^17.0.0",
    "@knodes/typedoc-plugin-pages": "^0.23.1",
    "@webda/shell": "^2.4.0",
    "commitlint": "^17.0.0",
    "lerna": "^6.0.3",
    "typedoc": "~0.23.24",
    "typedoc-plugin-mermaid": "~1.9.0"
  },
  "resolutions": {
    "typescript": "~4.9.3",
    "deepmerge-ts": "<4.2.0"
  },
  "license": "LGPL-3.0",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "lerna run build",
    "test": "lerna run test",
    "new-version": "lerna run build && lerna version --message 'chore(release): publish'",
    "lint": "lerna run lint --parallel",
    "lint:fix": "lerna run lint:fix --parallel",
    "lerna:publish": "lerna publish",
    "init": "husky install",
    "new-module": "webda init webda:module"
  },
  "command": {
    "publish": {
      "conventionalCommits": true
    }
  },
  "webda": {
    
  },
  "type": "module"
}

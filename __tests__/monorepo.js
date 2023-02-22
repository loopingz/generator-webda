"use strict";
const { readFileSync } = require("fs");
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-webda:monorepo", () => {
  it("creates files", async () => {
    await helpers.run(path.join(__dirname, "../generators/monorepo")).withPrompts({ name: "custom-module" });
    assert.file([
      "tsconfig.json",
      "package.json",
      "README.md",
      "lerna.json",
      "nx.json",
      "sonar-project.properties",
      "LICENSE",
      ".github/workflows/ci.yml",
      "typedoc.json"
    ]);
    assert.noFile(["package.json.tpl", "webda.config.json", "webda.module.json"]);
    const pkg = JSON.parse(readFileSync("package.json").toString());
    // Test auto update
    assert.notStrictEqual(pkg.devDependencies.prettier, "0.0.0");
  });
});

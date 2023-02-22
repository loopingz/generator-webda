"use strict";
const { readFileSync } = require("fs");
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-webda:app", () => {
  it("creates files", async () => {
    await helpers.run(path.join(__dirname, "../generators/app")).withPrompts({ name: "custom-module" });
    assert.file([
      "tsconfig.json",
      "package.json",
      "README.md",
      "sonar-project.properties",
      "LICENSE",
      "webda.config.json",
      "webda.module.json",
      ".github/workflows/ci.yml",
      "typedoc.json"
    ]);
    assert.noFile(["package.json.tpl"]);
    const pkg = JSON.parse(readFileSync("package.json").toString());
    // Test auto update
    assert.notStrictEqual(pkg.devDependencies.prettier, "0.0.0");
    assert.notStrictEqual(pkg.dependencies["@types/node"], "^12.0.0");
  });

  it("no typedoc", async () => {
    await helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ name: "custom-module", typedoc: false, module: true, sonar: false, githubAction: false });
    assert.file(["tsconfig.json", "package.json", "README.md", "LICENSE", "webda.module.json"]);
    assert.noFile([
      "sonar-project.properties",
      ".github/workflows/ci.yml",
      "typedoc.json",
      "package.json.tpl",
      "webda.config.json"
    ]);
  });

  it("no typedoc with gh", async () => {
    await helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ name: "custom-module", typedoc: false, module: true, sonar: false });
    assert.file([
      "tsconfig.json",
      "package.json",
      "README.md",
      "LICENSE",
      "webda.module.json",
      ".github/workflows/ci.yml"
    ]);
    assert.noFile([
      "sonar-project.properties",
      ".github/workflows/docs.yml",
      "typedoc.json",
      "package.json.tpl",
      "webda.config.json"
    ]);
  });
});

"use strict";
const { readFileSync } = require("fs");
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-webda:object", () => {
  it("new-service", async () => {
    await helpers.run(path.join(__dirname, "../generators/service")).withPrompts({ name: "CustomService" });
    assert.file(["src/services/customservice.ts", "src/services/customservice.spec.ts"]);
  });

  it("new-model", async () => {
    await helpers.run(path.join(__dirname, "../generators/model")).withPrompts({ name: "NewModel" });
    assert.file(["src/models/newmodel.ts", "src/models/newmodel.spec.ts"]);
  });

  it("new-model-custom", async () => {
    await helpers
      .run(path.join(__dirname, "../generators/model"))
      .withPrompts({ name: "NewModel", path: "src/custom" });
    assert.file(["src/custom/newmodel.ts", "src/custom/newmodel.spec.ts"]);
  });
});

const Generator = require("yeoman-generator");
const packageJson = require("package-json");

module.exports = class extends Generator {
  logo(lines) {
    lines = lines || [];
    const logoLines = require("./logo.json");
    console.log("");
    logoLines.forEach((line, idx) => {
      line = "  " + line.join("") + "  ";
      if (idx > 0 && lines.length > idx - 1) {
        line += lines[idx - 1];
      }
      console.log(line);
    });
    console.log("");
  }
  _getName() {
    return this.appname.replace(/ /g, "-").toLowerCase();
  }

  /**
   * Auto-update all deps of package
   * @param {*} pkg
   */
  async autoUpdate(pkg) {
    if (!pkg) {
      return;
    }
    for (let p in pkg.devDependencies) {
      pkg.devDependencies[p] = `^${(await packageJson(p)).version}`;
    }
    for (let p in pkg.dependencies) {
      pkg.dependencies[p] = `^${(await packageJson(p)).version}`;
    }
  }
};

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Database/Database.ts
var Database_exports = {};
__export(Database_exports, {
  DatabaseConfig: () => DatabaseConfig
});
module.exports = __toCommonJS(Database_exports);
var import_mongoose = __toESM(require("mongoose"));
var DatabaseConfig = class {
  static initialize() {
    import_mongoose.default.connection.on("open", () => {
      console.log("                        .,,uod8B8bou,,.");
      console.log("              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.");
      console.log("         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||");
      console.log(`         !...:!TVBBBRPFT||||||||||!!^^"'    ||||`);
      console.log(`         !.......:!?|||||!!^^"'             ||||`);
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||  #connected         ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         `.........||||                    ,||||");
      console.log("          .;.......||||               _.-!!|||||");
      console.log("   .,uodWBBBBb.....||||       _.-!!|||||||||!':");
      console.log("!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....");
      console.log("!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   `.");
      console.log("!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     `.");
      console.log('!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"`;:::       `.');
      console.log("!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.");
      console.log("`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.");
      console.log("  `..........:::::::::::::::::::::::;iof688888888888b.     `YBBBP^'");
      console.log("    `........::::::::::::::::;iof688888888888888888888b.     `");
      console.log("      `......:::::::::;iof688888888888888888888888888888b.");
      console.log("        `....:::;iof688888888888888888888888888888888899fT!");
      console.log("          `..::!8888888888888888888888888888888899fT|!^\"'");
      console.log("            `' !!988888888888888888888888899fT|!^\"");
      console.log('                `!!8888888888888888899fT|!^"');
      console.log('                  `!988888888899fT|!^"');
      console.log('                    `!9899fT|!^"');
      console.log('                      `!^"');
    });
    import_mongoose.default.connect(process.env.DATABASE_URL);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatabaseConfig
});

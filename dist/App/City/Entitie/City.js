"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/App/City/Entitie/City.ts
var City_exports = {};
__export(City_exports, {
  City: () => City
});
module.exports = __toCommonJS(City_exports);
var import_mongoose = require("mongoose");
var CitySchema = new import_mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });
var City = (0, import_mongoose.model)("citys", CitySchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  City
});

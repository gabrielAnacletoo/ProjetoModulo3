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

// src/App/CitySearch/Entitie/CitySearch.ts
var CitySearch_exports = {};
__export(CitySearch_exports, {
  CitySearch: () => CitySearch
});
module.exports = __toCommonJS(CitySearch_exports);
var import_mongoose = require("mongoose");
var CitySearchSchema = new import_mongoose.Schema({
  city: { type: String, required: true },
  technology: { type: String, required: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var CitySearch = (0, import_mongoose.model)("citysearch", CitySearchSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CitySearch
});

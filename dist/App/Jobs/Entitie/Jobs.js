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

// src/App/Jobs/Entitie/Jobs.ts
var Jobs_exports = {};
__export(Jobs_exports, {
  Jobs: () => Jobs
});
module.exports = __toCommonJS(Jobs_exports);
var import_mongoose = require("mongoose");
var import_mongoose_paginate_v2 = __toESM(require("mongoose-paginate-v2"));
var JobsSchema = new import_mongoose.Schema({
  position: { type: String, required: true, enum: ["junior", "pleno", "senior"], default: null },
  //junior, pleno , senior
  salary: { type: String, required: true },
  //salario
  jobcontract: { type: String, required: true, enum: ["clt", "pj"], default: null },
  //clt ou pj
  localtype: { type: String, required: true, enum: ["hibrido", "remoto", "presencial"], default: null },
  //hibrido , remoto, presencial
  city: { type: String, required: true },
  //cidade
  // UF: { type: String, required: true}, //Estado
  technology: [{ type: String, required: true }],
  //tecnologia
  website: { type: String, required: true },
  //link da empresa
  company: { type: String, required: true },
  //nome da empresa
  companysize: { type: String, required: true, enum: ["pequena", "media", "grande"], default: null },
  //tamanho da empresa
  description: { type: String, required: true },
  //descrição da vaga
  link: { type: String, required: true }
  //nao entendi
}, { timestamps: true });
JobsSchema.plugin(import_mongoose_paginate_v2.default);
var Jobs = (0, import_mongoose.model)("jobs", JobsSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Jobs
});

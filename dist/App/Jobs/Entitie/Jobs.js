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

// src/App/Jobs/Entitie/Jobs.ts
var Jobs_exports = {};
__export(Jobs_exports, {
  Jobs: () => Jobs
});
module.exports = __toCommonJS(Jobs_exports);
var import_mongoose = require("mongoose");
var JobsSchema = new import_mongoose.Schema({
  position: { type: String, required: true, enum: ["junior", "pleno", "senior"], default: null },
  //junior, pleno , senior
  salary: { type: String, required: true },
  //salario
  jobcontract: { type: String, required: true, enum: ["clt", "pj"], default: null },
  //clt ou pj
  localtype: { type: String, required: true, enum: ["hibrido", "remoto", "presencial"], default: null },
  //hibrido , remoto, presencial
  cityId: { type: import_mongoose.Schema.Types.ObjectId, ref: "citys" },
  //cidade
  technologyId: { type: import_mongoose.Schema.Types.ObjectId, ref: "technologys" },
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
var Jobs = (0, import_mongoose.model)("jobs", JobsSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Jobs
});

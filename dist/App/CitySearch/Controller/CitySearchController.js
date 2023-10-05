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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/App/CitySearch/Controller/CitySearchController.ts
var CitySearchController_exports = {};
__export(CitySearchController_exports, {
  CitySearchController: () => CitySearchController
});
module.exports = __toCommonJS(CitySearchController_exports);
var CitySearchController = class {
  constructor(service) {
    this.service = service;
  }
  FilterFromController(req, res) {
    return __async(this, null, function* () {
      const technologyId = req.query.technology;
      const cityId = req.query.city;
      try {
        const results = yield this.service.FilterFromService(cityId, technologyId);
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error", status: 500 });
      }
    });
  }
  FindTopFiveLocal(req, res) {
    return __async(this, null, function* () {
      try {
        const Result = yield this.service.FindTopFiveLocal();
        return res.status(200).json(Result);
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CitySearchController
});

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

// src/App/City/Service/CityService.ts
var CityService_exports = {};
__export(CityService_exports, {
  CityService: () => CityService
});
module.exports = __toCommonJS(CityService_exports);
var CityService = class {
  constructor(repository) {
    this.repository = repository;
  }
  CreateFromService(data) {
    return __async(this, null, function* () {
      try {
        const CretedCity = yield this.repository.Create(data);
        if (!CretedCity) {
          return { error: "This city cannot be created", status: 400 };
        }
        return CretedCity;
      } catch (error) {
        return { error: "Internal server error", status: 500 };
      }
    });
  }
  FindAllFromService() {
    return __async(this, null, function* () {
      try {
        const Result = yield this.repository.FindAll();
        return Result;
      } catch (error) {
        return { error: "Internal Server Error", status: 500 };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CityService
});

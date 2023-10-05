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

// src/App/CitySearch/Service/CitySearchService.ts
var CitySearchService_exports = {};
__export(CitySearchService_exports, {
  CitySearchService: () => CitySearchService
});
module.exports = __toCommonJS(CitySearchService_exports);
var CitySearchService = class {
  constructor(CitySearchrepository, Cityrepository, TechRepository) {
    this.CitySearchrepository = CitySearchrepository;
    this.Cityrepository = Cityrepository;
    this.TechRepository = TechRepository;
  }
  FilterFromService(cityId, technologyId) {
    return __async(this, null, function* () {
      try {
        const CityConsult = yield this.Cityrepository.FindByName(cityId);
        if (!CityConsult) {
          return { error: "Cidade n\xE3o encontrada", status: 404 };
        }
        const CityConsultString = CityConsult._id.toString();
        const TechConsult = yield this.TechRepository.FindByName(technologyId);
        if (!TechConsult) {
          return { error: "Tecnologia n\xE3o encontrada", status: 404 };
        }
        const TechConsultString = TechConsult._id.toString();
        const existingSearch = yield this.CitySearchrepository.FindByCityAndTechIds(CityConsultString, TechConsultString);
        if (existingSearch) {
          const existingSearchID = existingSearch._id.toString();
          const Incremented = yield this.CitySearchrepository.IncrementCount(existingSearchID);
          return { result: Incremented, message: "Registro existente incrementado com sucesso" };
        } else {
          const newSearch = {
            cityId: CityConsultString,
            technologyId: TechConsultString
          };
          yield this.CitySearchrepository.Create(newSearch);
          return { result: newSearch, message: "Novo registro criado com sucesso" };
        }
      } catch (error) {
        return { error: "Internal Server Error", status: 500 };
      }
    });
  }
  FindTopFiveLocal() {
    return __async(this, null, function* () {
      try {
        const Result = yield this.CitySearchrepository.FindTopFivelocal();
        return Result;
      } catch (error) {
        return { error: "Internal Server Error", status: 500 };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CitySearchService
});

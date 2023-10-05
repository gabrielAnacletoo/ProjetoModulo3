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

// src/App/Jobs/Service/JobsService.ts
var JobsService_exports = {};
__export(JobsService_exports, {
  JobService: () => JobService
});
module.exports = __toCommonJS(JobsService_exports);
var JobService = class {
  constructor(Repository, TechRepository, cityRepository, citysearchRepository, TechSearchRepository) {
    this.Repository = Repository;
    this.TechRepository = TechRepository;
    this.cityRepository = cityRepository;
    this.citysearchRepository = citysearchRepository;
    this.TechSearchRepository = TechSearchRepository;
  }
  CreateFromService(data) {
    return __async(this, null, function* () {
      try {
        const CretedJob = yield this.Repository.Create(data);
        if (!CretedJob) {
          return { error: "This position cannot be created", status: 400 };
        }
        return CretedJob;
      } catch (error) {
        return { error: "Internal server error", status: 500 };
      }
    });
  }
  FilterFromService(filter) {
    return __async(this, null, function* () {
      try {
        if (filter.cityId && filter.technologyId) {
          const CityConsult = yield this.cityRepository.FindById(filter.cityId);
          if (!CityConsult) {
            return { error: "City not found", status: 404 };
          }
          const TechConsult = yield this.TechRepository.FindById(filter.technologyId);
          if (!TechConsult) {
            return { error: "Tecnology not found", status: 404 };
          }
          if (CityConsult && TechConsult) {
            const existingSearch = yield this.citysearchRepository.FindByCityAndTechIds(filter.cityId, filter.technologyId);
            const existingTech = yield this.TechSearchRepository.FindByTechIds(filter.technologyId);
            if (existingSearch && existingTech) {
              const existingSearchID = existingSearch._id.toString();
              const existingTechID = existingTech._id.toString();
              const IncrementedCity = yield this.citysearchRepository.IncrementCount(existingSearchID);
              const IncrementedTechnology = yield this.TechSearchRepository.IncrementCount(existingTechID);
              return {
                results: yield this.Repository.Filter(filter),
                message: "Registros existentes incrementados com sucesso"
              };
            } else {
              const newSearch = { cityId: filter.cityId, technologyId: filter.technologyId };
              const newTechSearch = { technologyId: filter.technologyId };
              yield this.citysearchRepository.Create(newSearch);
              yield this.TechSearchRepository.Create(newTechSearch);
              return {
                result: newSearch,
                newTechSearch,
                results: yield this.Repository.Filter(filter),
                message: "Novos registros criados com sucesso"
              };
            }
          }
        } else {
          if (filter.technologyId) {
            console.log("Ids na service ==> ", filter.cityId, filter.technologyId);
            const TechConsult = yield this.TechRepository.FindById(filter.technologyId);
            if (!TechConsult) {
              return { error: "Tecnology not found", status: 404 };
            }
            if (TechConsult) {
              const existingTech = yield this.TechRepository.FindById(filter.technologyId);
              if (existingTech) {
                const existingTechID = existingTech._id.toString();
                const IncrementedTechnology = yield this.TechRepository.IncrementCount(existingTechID);
                return {
                  result: IncrementedTechnology,
                  results: yield this.Repository.Filter(filter),
                  message: "Registros existentes incrementados com sucesso"
                };
              } else {
                const newTechSearch = { technologyId: filter.technologyId };
                yield this.TechSearchRepository.Create(newTechSearch);
                return {
                  result: newTechSearch,
                  results: yield this.Repository.Filter(filter),
                  message: "Novos registros criados com sucesso"
                };
              }
            }
          }
        }
        return yield this.Repository.Filter(filter);
      } catch (error) {
        return { error: "Internal Server Error", status: 500 };
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobService
});

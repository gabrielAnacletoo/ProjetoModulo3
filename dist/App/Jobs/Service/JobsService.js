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

// src/Utils/StatusCode/StatusCode.ts
var STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  NO_CONTENT: 204,
  NON_AUTHORIZED: 401,
  NOT_FOUND: 404,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500
};

// src/Utils/MakeErrors/MakeErrors.ts
function MakeErrors(message, status) {
  return {
    error: true,
    message,
    status
  };
}

// src/App/Jobs/Service/JobsService.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JobService = class {
  constructor(Repository, TechRepository, citysearchRepository, userRepository) {
    this.Repository = Repository;
    this.TechRepository = TechRepository;
    this.citysearchRepository = citysearchRepository;
    this.userRepository = userRepository;
  }
  CreateFromService(data) {
    return __async(this, null, function* () {
      try {
        const CretedJob = yield this.Repository.Create(data);
        if (!CretedJob) {
          return MakeErrors("Essa vaga n\xE3o pode ser criada, preencha corretamente", STATUS_CODE.BAD_REQUEST);
        }
        return CretedJob;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FilterFromService(filter, token) {
    return __async(this, null, function* () {
      const [, tokenNovo] = token.split(" ");
      const decoded = import_jsonwebtoken.default.decode(tokenNovo);
      const { _id } = decoded._doc;
      try {
        const Result = yield this.Repository.Filter(filter);
        if (filter.city && filter.technology) {
          const ExistingSearch = yield this.citysearchRepository.FindByCityAndTech(filter.city, filter.technology);
          if (ExistingSearch) {
            const ResultSearch = yield this.citysearchRepository.IncrementCount(ExistingSearch._id.toString());
            return {
              Incrementos: ResultSearch,
              Consulta: Result,
              Message: "Registros existentes incrementados com sucesso"
            };
          } else {
            const NewSearch = { city: filter.city, technology: filter.technology };
            const ResultNewSearch = yield this.citysearchRepository.Create(NewSearch);
            return {
              Incrementos: ResultNewSearch,
              Consulta: `N\xE3o existem vagas em ${filter.city} com tecnlogia ${filter.technology}.`,
              Message: "Registro criado."
            };
          }
        }
        if (filter.technology) {
          let IncrementedTechnology = [];
          const TechFind = yield this.TechRepository.FindByName(filter.technology);
          if (!TechFind) {
            return MakeErrors("Tecnologia n\xE3o encontrada", STATUS_CODE.NOT_FOUND);
          }
          if (TechFind) {
            for (const tech of TechFind) {
              const existingTechID = tech._id.toString();
              const incremented = yield this.TechRepository.IncrementCount(existingTechID);
              IncrementedTechnology.push(incremented);
            }
            if (Result.length === 0) {
              return { Incrementos: IncrementedTechnology, Consulta: `N\xE3o existem vagas para ${filter.technology}` };
            }
            return {
              Incremento: IncrementedTechnology,
              Consulta: Result
            };
          }
        }
        const valuesToSave = [];
        for (const key in filter) {
          if (filter.hasOwnProperty(key)) {
            const value = filter[key];
            if (typeof value === "string") {
              valuesToSave.push(value);
            }
          }
        }
        const SaveHistory = yield this.userRepository.AddHistory(valuesToSave, _id);
        return Result;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  Pagination(page, limit) {
    return __async(this, null, function* () {
      try {
        const result = yield this.Repository.Pagination(page, limit);
        return result;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FindAll() {
    return __async(this, null, function* () {
      try {
        const result = yield this.Repository.FindAll();
        return result;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobService
});

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

// src/App/Technology/Service/TechnologyService.ts
var TechnologyService_exports = {};
__export(TechnologyService_exports, {
  TechnologyService: () => TechnologyService
});
module.exports = __toCommonJS(TechnologyService_exports);

// src/Utils/MakeErrors/MakeErrors.ts
function MakeErrors(message, status) {
  return {
    error: true,
    message,
    status
  };
}

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

// src/App/Technology/Service/TechnologyService.ts
var TechnologyService = class {
  constructor(repository) {
    this.repository = repository;
  }
  CreateFromService(data) {
    return __async(this, null, function* () {
      try {
        const FoundTech = yield this.repository.FindByName(data.name);
        if (FoundTech) {
          return MakeErrors(`Tecnologia ${data.name} j\xE1 existe.`, STATUS_CODE.BAD_REQUEST);
        }
        const TechnologyCreated = yield this.repository.Create(data);
        if (!TechnologyCreated) {
          return MakeErrors("Tecnologia n\xE3o foi criada, preencha corretamente", STATUS_CODE.BAD_REQUEST);
        }
        return TechnologyCreated;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FindAllFromService() {
    return __async(this, null, function* () {
      try {
        const result = yield this.repository.FindAll();
        return result;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TechnologyService
});

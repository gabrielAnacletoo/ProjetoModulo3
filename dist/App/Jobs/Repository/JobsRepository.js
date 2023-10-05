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

// src/App/Jobs/Repository/JobsRepository.ts
var JobsRepository_exports = {};
__export(JobsRepository_exports, {
  JobsRepository: () => JobsRepository
});
module.exports = __toCommonJS(JobsRepository_exports);

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

// src/App/Jobs/Repository/JobsRepository.ts
var JobsRepository = class {
  constructor(model) {
    this.model = model;
  }
  Create(data) {
    return __async(this, null, function* () {
      try {
        return yield this.model.create(data);
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FindById(id) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findById(id);
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  // async Filter(filter: Filter) {
  // Objeto vazio do tipo key: string e tipo regex 
  // significa que cada key do objeto é do tipo string 
  // e cada key tem 2 tipos regex e options
  // const caseInsensitiveFilter: { [key: string]: { $regex: string; $options: string } } = {};
  /* laço for pra cada key de filter
       o objeto vazio recebe as keys de filter com regex e options 'i' pra aceitar uppercase e lowercaser
       no laço for ele vai iterar sobre cade propriedade do filter e salvar no objeto vazio
       ex: filter veio cidade sp e vaga desenvolvedor de software
       entao objeto vazio sera
       const caseInsensitiveFilter = {
    city: {
      $regex: 'São Paulo',
      $options: 'i',
    },
    title: {
      $regex: 'Desenvolvedor de Software',
      $options: 'i',
    },
  } */
  //   for (const key in filter) {
  //     caseInsensitiveFilter[key] = {
  //       $regex: filter[key],
  //       $options: 'i',
  //     };
  //   }
  //   return await this.model.find(caseInsensitiveFilter);
  // }
  Filter(filter) {
    return __async(this, null, function* () {
      const caseInsensitiveFilter = {};
      for (const key in filter) {
        const filterValue = filter[key];
        if (key === "technology") {
          const technolodyNames = Array.isArray(filterValue) ? filterValue : [filterValue];
          caseInsensitiveFilter[key] = {
            $in: technolodyNames.map((name) => new RegExp(`^${name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}$`, "i"))
          };
        } else {
          caseInsensitiveFilter[key] = {
            $regex: filterValue,
            $options: "i"
          };
        }
      }
      return yield this.model.find(caseInsensitiveFilter);
    });
  }
  Pagination(page, limit) {
    return __async(this, null, function* () {
      const options = {
        page,
        limit,
        sort: { createdAt: -1 }
      };
      return yield this.model.paginate({}, options);
    });
  }
  FindAll() {
    return __async(this, null, function* () {
      return yield this.model.find();
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobsRepository
});

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

// src/App/Jobs/Controller/JobsController.ts
var JobsController_exports = {};
__export(JobsController_exports, {
  JobsController: () => JobsController
});
module.exports = __toCommonJS(JobsController_exports);

// src/Utils/Validation/Jobs/JobSchemaValidation.ts
var yup = __toESM(require("yup"));
var JobsSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema = yup.object().shape({
        position: yup.string().required(),
        salary: yup.number().required(),
        website: yup.string().required(),
        company: yup.string().required(),
        description: yup.string().required(),
        link: yup.string().required()
      });
      try {
        yield userSchema.validate(data);
        return { message: "Success", status: 200 };
      } catch (error) {
        return { error: "you need to fill in all the fields", status: 404 };
      }
    });
  }
};

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

// src/App/Jobs/Controller/JobsController.ts
var JobsController = class {
  constructor(service) {
    this.service = service;
  }
  CreateFromController(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const bodyValidation = yield JobsSchemaValidation.isValid(body);
      if (bodyValidation.error) {
        return res.status(bodyValidation.status).json(bodyValidation.error);
      }
      try {
        const job = yield this.service.CreateFromService(body);
        return res.status(STATUS_CODE.CREATED).json(job);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  FilterFromController(req, res) {
    return __async(this, null, function* () {
      const token = req.headers.authorization;
      try {
        const params = req.query;
        const filter = {};
        for (const key in params) {
          filter[key] = params[key];
        }
        const results = yield this.service.FilterFromService(filter, token);
        res.status(STATUS_CODE.OK).json(results);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  Pagination(req, res) {
    return __async(this, null, function* () {
      try {
        const page = parseInt(req.query.page);
        const limite = parseInt(req.query.limit);
        const result = yield this.service.Pagination(page, limite);
        return res.status(STATUS_CODE.OK).json(result);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  FindAll(req, res) {
    return __async(this, null, function* () {
      try {
        const result = yield this.service.FindAll();
        return res.status(STATUS_CODE.OK).json(result);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobsController
});

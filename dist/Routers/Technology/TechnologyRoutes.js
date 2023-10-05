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

// src/Routers/Technology/TechnologyRoutes.ts
var TechnologyRoutes_exports = {};
__export(TechnologyRoutes_exports, {
  TechnologyRouter: () => TechnologyRouter
});
module.exports = __toCommonJS(TechnologyRoutes_exports);
var import_express = require("express");

// src/Utils/MakeErrors/MakeErrors.ts
function MakeErrors(message, status) {
  return {
    error: true,
    message,
    status
  };
}

// src/App/Technology/Repository/TechnologyRepository.ts
var TechnologyRepository = class {
  constructor(model2) {
    this.model = model2;
  }
  Create(data) {
    return __async(this, null, function* () {
      try {
        return yield this.model.create(data);
      } catch (error) {
        return MakeErrors(error.message, 500);
      }
    });
  }
  IncrementCount(id) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findByIdAndUpdate(
          id,
          { $inc: { count: 1 } },
          { new: true }
        );
      } catch (error) {
        return MakeErrors(error.message, 500);
      }
    });
  }
  FindById(id) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findById(id);
      } catch (error) {
        return MakeErrors(error.message, 500);
      }
    });
  }
  FindAll() {
    return __async(this, null, function* () {
      try {
        return yield this.model.find();
      } catch (error) {
        return MakeErrors(error.message, 500);
      }
    });
  }
  FindTopFiveGlobal() {
    return __async(this, null, function* () {
      return this.model.find().select("-createdAt -updatedAt -__v -_id").sort({ count: -1 }).limit(5);
    });
  }
  FindByName(names) {
    return __async(this, null, function* () {
      if (!Array.isArray(names)) {
        names = [names];
      }
      return yield this.model.find({ name: { $in: names.map((name) => new RegExp(`^${name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}$`, "i")) } });
    });
  }
};

// src/Utils/Validation/Technology/TechnologySchemaValidation.ts
var yup = __toESM(require("yup"));
var TechnologySchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema = yup.object().shape({
        name: yup.string().required()
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

// src/App/Technology/Controller/TechnologyController.ts
var TechnologyController = class {
  constructor(service) {
    this.service = service;
  }
  CreateFromController(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const bodyValidation = yield TechnologySchemaValidation.isValid(body);
      if (bodyValidation.error) {
        return res.status(bodyValidation.status).json(bodyValidation.error);
      }
      try {
        const Technology2 = yield this.service.CreateFromService(body);
        return res.status(STATUS_CODE.CREATED).json(Technology2);
      } catch (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({ error: "Preencha os dados corretamente" });
      }
    });
  }
  FindTopFiveGlobal(req, res) {
    return __async(this, null, function* () {
      try {
        const Result = yield this.service.FindTopFiveGlobal();
        return res.status(STATUS_CODE.OK).json(Result);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  FindAllFromController(req, res) {
    return __async(this, null, function* () {
      try {
        const Result = yield this.service.FindAllFromService();
        return res.status(STATUS_CODE.OK).json(Result);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
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

// src/App/Technology/Entities/Technology.ts
var import_mongoose = require("mongoose");
var TechnologySChema = new import_mongoose.Schema({
  name: { type: String, require: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var Technology = (0, import_mongoose.model)("technologys", TechnologySChema);

// src/App/Technology/MakeTechnology.ts
var MakeTechnology = class {
  static getInstance() {
    const Repository = new TechnologyRepository(Technology);
    const Service = new TechnologyService(Repository);
    const Controller2 = new TechnologyController(Service);
    return Controller2;
  }
};

// src/Utils/Middlewares/AuthMiddleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthMiddleware = class {
  static handler(req, res, next) {
    return __async(this, null, function* () {
      const { headers } = req;
      if (!headers.authorization) {
        return res.status(STATUS_CODE.NON_AUTHORIZED).json(headers.authorization);
      }
      const [, token] = headers.authorization.split(" ");
      try {
        import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
      } catch (err) {
        return res.status(STATUS_CODE.NON_AUTHORIZED).json(err);
      }
      next();
    });
  }
};

// src/Routers/Technology/TechnologyRoutes.ts
var TechnologyRouter = (0, import_express.Router)();
var Controller = MakeTechnology.getInstance();
TechnologyRouter.use(AuthMiddleware.handler);
TechnologyRouter.post("/register", Controller.CreateFromController.bind(Controller));
TechnologyRouter.get("/", Controller.FindAllFromController.bind(Controller));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TechnologyRouter
});

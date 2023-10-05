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

// src/App/Technology/MakeTechnology.ts
var MakeTechnology_exports = {};
__export(MakeTechnology_exports, {
  MakeTechnology: () => MakeTechnology
});
module.exports = __toCommonJS(MakeTechnology_exports);

// src/App/Technology/Repository/TechnologyRepository.ts
var TechnologyRepository = class {
  constructor(model2) {
    this.model = model2;
  }
  Create(data) {
    return __async(this, null, function* () {
      return yield this.model.create(data);
    });
  }
  IncrementCount(id) {
    return __async(this, null, function* () {
      return yield this.model.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        { new: true }
      );
    });
  }
  FindById(id) {
    return __async(this, null, function* () {
      return yield this.model.findById(id);
    });
  }
  FindAll() {
    return __async(this, null, function* () {
      return yield this.model.find();
    });
  }
  FindTopFiveGlobal() {
    return __async(this, null, function* () {
      return this.model.find().select("-createdAt -updatedAt -__v -_id").sort({ count: -1 }).limit(5);
    });
  }
  FindByName(name) {
    return __async(this, null, function* () {
      return yield this.model.findOne({ name });
    });
  }
};

// src/Utils/Validation/TechnologySchemaValidation.ts
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
        return res.status(201).json(Technology2);
      } catch (error) {
        return res.status(400).json({ error: "Preencha os dados corretamente" });
      }
    });
  }
  FindAllFromController(req, res) {
    return __async(this, null, function* () {
      try {
        const Result = yield this.service.FindAllFromService();
        return res.status(200).json(Result);
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
  FindTopFiveGlobal(req, res) {
    return __async(this, null, function* () {
      try {
        const Result = yield this.service.FindTopFiveGlobal();
        return res.status(200).json(Result);
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
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
        const TechnologyCreated = yield this.repository.Create(data);
        if (!TechnologyCreated) {
          return { error: "Technology cannot be created", status: 400 };
        }
        return TechnologyCreated;
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
  FindTopFiveGlobal() {
    return __async(this, null, function* () {
      try {
        const Result = yield this.repository.FindTopFiveGlobal();
        return Result;
      } catch (error) {
        return { error: "Internal Server Error", status: 500 };
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
    const Controller = new TechnologyController(Service);
    return Controller;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeTechnology
});

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

// src/App/TechSearch/MakeTechSearch.ts
var MakeTechSearch_exports = {};
__export(MakeTechSearch_exports, {
  MakeTechSearch: () => MakeTechSearch
});
module.exports = __toCommonJS(MakeTechSearch_exports);

// src/App/TechSearch/Repository/TechSearchRepository.ts
var TechSearchRepository = class {
  constructor(model2) {
    this.model = model2;
  }
  Create(data) {
    return __async(this, null, function* () {
      return yield this.model.create(data);
    });
  }
  FindById(id) {
    return __async(this, null, function* () {
      return yield this.model.findById(id);
    });
  }
  IncrementCount(id) {
    return __async(this, null, function* () {
      return yield this.model.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        { new: true }
      ).select("-__v");
    });
  }
  FindByTechIds(techId) {
    return __async(this, null, function* () {
      return yield this.model.findOne({ technologyId: techId });
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

// src/App/TechSearch/Controller/TechSearchController.ts
var TechSearchController = class {
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
        const TechSearch2 = yield this.service.CreateFromService(body);
        return res.status(201).json(TechSearch2);
      } catch (error) {
        return res.status(400).json({ error: "Preencha os dados corretamente" });
      }
    });
  }
};

// src/App/TechSearch/Service/TechSearchService.ts
var TechSearchService = class {
  constructor(repository) {
    this.repository = repository;
  }
  CreateFromService(data) {
    return __async(this, null, function* () {
      try {
        const TechSearchCreated = yield this.repository.Create(data);
        if (!TechSearchCreated) {
          return { error: "This TechSearch cannot be created", status: 400 };
        }
        return TechSearchCreated;
      } catch (error) {
        return { error: "Internal server error", status: 500 };
      }
    });
  }
};

// src/App/TechSearch/Entitie/TechSearch.ts
var import_mongoose = require("mongoose");
var TechSearchSchema = new import_mongoose.Schema({
  technologyId: { type: import_mongoose.Schema.Types.ObjectId, ref: "technologys" },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var TechSearch = (0, import_mongoose.model)("techsearch", TechSearchSchema);

// src/App/TechSearch/MakeTechSearch.ts
var MakeTechSearch = class {
  static getInstance() {
    const Repository = new TechSearchRepository(TechSearch);
    const Service = new TechSearchService(Repository);
    const Controller = new TechSearchController(Service);
    return Controller;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeTechSearch
});

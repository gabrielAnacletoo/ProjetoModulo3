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

// src/App/CitySearch/MakeCitySearch.ts
var MakeCitySearch_exports = {};
__export(MakeCitySearch_exports, {
  MakeCitySearch: () => MakeCitySearch
});
module.exports = __toCommonJS(MakeCitySearch_exports);

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

// src/App/CitySearch/Controller/CitySearchController.ts
var CitySearchController = class {
  constructor(service) {
    this.service = service;
  }
  FindTopFiveLocal(req, res) {
    return __async(this, null, function* () {
      try {
        const Result = yield this.service.FindTopFiveLocal();
        console.log("Result controler ==> ", Result);
        return res.status(STATUS_CODE.OK).json(Result);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
};

// src/Utils/MakeErrors/MakeErrors.ts
function MakeErrors(message, status) {
  return {
    error: true,
    message,
    status
  };
}

// src/App/CitySearch/Service/CitySearchService.ts
var CitySearchService = class {
  constructor(CitySearchrepository, TechRepository) {
    this.CitySearchrepository = CitySearchrepository;
    this.TechRepository = TechRepository;
  }
  FindTopFiveLocal() {
    return __async(this, null, function* () {
      try {
        const technology = yield this.TechRepository.FindTopFiveGlobal();
        if (technology) {
          const technologyName = technology[0].name;
          if (technologyName) {
            const Result = yield this.CitySearchrepository.FindTopFivelocal(technologyName);
            return { Top5Global: technology, Top5PorLocal: Result };
          }
        }
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};

// src/App/Technology/Repository/TechnologyRepository.ts
var TechnologyRepository = class {
  constructor(model3) {
    this.model = model3;
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

// src/App/Technology/Entities/Technology.ts
var import_mongoose = require("mongoose");
var TechnologySChema = new import_mongoose.Schema({
  name: { type: String, require: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var Technology = (0, import_mongoose.model)("technologys", TechnologySChema);

// src/App/CitySearch/Repository/CitySearchRepository.ts
var CitySearchRepository = class {
  constructor(model3) {
    this.model = model3;
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
  FindByCityAndTech(city, technology) {
    return __async(this, null, function* () {
      const result = yield this.model.findOne({ city, technology });
      return result;
    });
  }
  FindByCityByIds(cityId) {
    return __async(this, null, function* () {
      try {
        const result = yield this.model.findOne({ cityId });
        return result;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
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
  FindTopFivelocal(technology) {
    return __async(this, null, function* () {
      try {
        return this.model.find({ technology }).select("-createdAt -updatedAt -__v").sort({ count: -1 }).limit(5);
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FindByName(name) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findOne({ name });
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};

// src/App/CitySearch/Entitie/CitySearch.ts
var import_mongoose2 = require("mongoose");
var CitySearchSchema = new import_mongoose2.Schema({
  city: { type: String, required: true },
  technology: { type: String, required: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var CitySearch = (0, import_mongoose2.model)("citysearch", CitySearchSchema);

// src/App/CitySearch/MakeCitySearch.ts
var MakeCitySearch = class {
  static getInstance() {
    const CitySearchrepository = new CitySearchRepository(CitySearch);
    const TechRepository = new TechnologyRepository(Technology);
    const Service = new CitySearchService(CitySearchrepository, TechRepository);
    const Controller = new CitySearchController(Service);
    return Controller;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeCitySearch
});

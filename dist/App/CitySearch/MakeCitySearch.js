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

// src/App/CitySearch/Controller/CitySearchController.ts
var CitySearchController = class {
  constructor(service) {
    this.service = service;
  }
  FilterFromController(req, res) {
    return __async(this, null, function* () {
      const technologyId = req.query.technology;
      const cityId = req.query.city;
      try {
        const results = yield this.service.FilterFromService(cityId, technologyId);
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error", status: 500 });
      }
    });
  }
  FindTopFiveLocal(req, res) {
    return __async(this, null, function* () {
      try {
        const Result = yield this.service.FindTopFiveLocal();
        return res.status(200).json(Result);
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
};

// src/App/CitySearch/Service/CitySearchService.ts
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

// src/App/Technology/Repository/TechnologyRepository.ts
var TechnologyRepository = class {
  constructor(model4) {
    this.model = model4;
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

// src/App/Technology/Entities/Technology.ts
var import_mongoose = require("mongoose");
var TechnologySChema = new import_mongoose.Schema({
  name: { type: String, require: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var Technology = (0, import_mongoose.model)("technologys", TechnologySChema);

// src/App/City/Repository/CityRepository.ts
var CityRepository = class {
  constructor(model4) {
    this.model = model4;
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
  FindAll() {
    return __async(this, null, function* () {
      return yield this.model.find();
    });
  }
  FindByName(name) {
    return __async(this, null, function* () {
      return yield this.model.findOne({ name });
    });
  }
};

// src/App/City/Entitie/City.ts
var import_mongoose2 = require("mongoose");
var CitySchema = new import_mongoose2.Schema({
  name: { type: String, required: true }
}, { timestamps: true });
var City = (0, import_mongoose2.model)("citys", CitySchema);

// src/App/CitySearch/Repository/CitySearchRepository.ts
var CitySearchRepository = class {
  constructor(model4) {
    this.model = model4;
  }
  Create(data) {
    return __async(this, null, function* () {
      return yield this.model.create(data);
    });
  }
  FindByCityAndTechIds(cityId, techId) {
    return __async(this, null, function* () {
      const result = yield this.model.findOne({ cityId, technologyId: techId });
      return result;
    });
  }
  IncrementCount(id) {
    return __async(this, null, function* () {
      return yield this.model.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        { new: true }
      ).select("-__v").populate({
        path: "cityId",
        select: "-_id",
        model: "citys"
      });
    });
  }
  FindFilters(data) {
    return __async(this, null, function* () {
      const { cityId, technologyId } = data;
      return this.model.find({
        $and: [
          { "cityId": cityId },
          { "technologyId": technologyId }
        ]
      });
    });
  }
  FindTopFivelocal() {
    return __async(this, null, function* () {
      return this.model.find().select("-createdAt -updatedAt -__v -_id").populate({
        path: "cityId",
        select: "-_id name",
        model: "citys"
      }).populate({
        path: "technologyId",
        select: "-_id name",
        model: "technologys"
      }).sort({ count: -1 }).limit(5);
    });
  }
};

// src/App/CitySearch/Entitie/CitySearch.ts
var import_mongoose3 = require("mongoose");
var CitySearchSchema = new import_mongoose3.Schema({
  cityId: { type: import_mongoose3.Schema.Types.ObjectId, ref: "citys" },
  technologyId: { type: import_mongoose3.Schema.Types.ObjectId, ref: "technologys" },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var CitySearch = (0, import_mongoose3.model)("citysearch", CitySearchSchema);

// src/App/CitySearch/MakeCitySearch.ts
var MakeCitySearch = class {
  static getInstance() {
    const CitySearchrepository = new CitySearchRepository(CitySearch);
    const TechRepository = new TechnologyRepository(Technology);
    const Cityrepository = new CityRepository(City);
    const Service = new CitySearchService(CitySearchrepository, Cityrepository, TechRepository);
    const Controller = new CitySearchController(Service);
    return Controller;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeCitySearch
});

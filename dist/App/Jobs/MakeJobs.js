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

// src/App/Jobs/MakeJobs.ts
var MakeJobs_exports = {};
__export(MakeJobs_exports, {
  MakeJobs: () => MakeJobs
});
module.exports = __toCommonJS(MakeJobs_exports);

// src/App/Jobs/Repository/JobsRepository.ts
var JobsRepository = class {
  constructor(model6) {
    this.model = model6;
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
  Filter(filter) {
    return __async(this, null, function* () {
      return yield this.model.find(filter).select("-__v").populate({
        path: "cityId",
        select: "-_id name",
        model: "citys"
      }).populate({
        path: "technologyId",
        select: "-_id name",
        model: "technologys"
      });
    });
  }
};

// src/Utils/Validation/JobSchemaValidation.ts
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
        return res.status(201).json(job);
      } catch (error) {
        return res.status(400).json({ error: "Preencha os dados corretamente" });
      }
    });
  }
  FilterFromController(req, res) {
    return __async(this, null, function* () {
      const params = req.query;
      const filter = {};
      for (const key in params) {
        filter[key] = params[key];
      }
      const results = yield this.service.FilterFromService(filter);
      res.status(200).json(results);
    });
  }
};

// src/App/Jobs/Service/JobsService.ts
var JobService = class {
  constructor(Repository, TechRepository, cityRepository, citysearchRepository, TechSearchRepository2) {
    this.Repository = Repository;
    this.TechRepository = TechRepository;
    this.cityRepository = cityRepository;
    this.citysearchRepository = citysearchRepository;
    this.TechSearchRepository = TechSearchRepository2;
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

// src/App/Jobs/Entitie/Jobs.ts
var import_mongoose = require("mongoose");
var JobsSchema = new import_mongoose.Schema({
  position: { type: String, required: true, enum: ["junior", "pleno", "senior"], default: null },
  //junior, pleno , senior
  salary: { type: String, required: true },
  //salario
  jobcontract: { type: String, required: true, enum: ["clt", "pj"], default: null },
  //clt ou pj
  localtype: { type: String, required: true, enum: ["hibrido", "remoto", "presencial"], default: null },
  //hibrido , remoto, presencial
  cityId: { type: import_mongoose.Schema.Types.ObjectId, ref: "citys" },
  //cidade
  technologyId: { type: import_mongoose.Schema.Types.ObjectId, ref: "technologys" },
  //tecnologia
  website: { type: String, required: true },
  //link da empresa
  company: { type: String, required: true },
  //nome da empresa
  companysize: { type: String, required: true, enum: ["pequena", "media", "grande"], default: null },
  //tamanho da empresa
  description: { type: String, required: true },
  //descrição da vaga
  link: { type: String, required: true }
  //nao entendi
}, { timestamps: true });
var Jobs = (0, import_mongoose.model)("jobs", JobsSchema);

// src/App/Technology/Repository/TechnologyRepository.ts
var TechnologyRepository = class {
  constructor(model6) {
    this.model = model6;
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
var import_mongoose2 = require("mongoose");
var TechnologySChema = new import_mongoose2.Schema({
  name: { type: String, require: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var Technology = (0, import_mongoose2.model)("technologys", TechnologySChema);

// src/App/City/Repository/CityRepository.ts
var CityRepository = class {
  constructor(model6) {
    this.model = model6;
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
var import_mongoose3 = require("mongoose");
var CitySchema = new import_mongoose3.Schema({
  name: { type: String, required: true }
}, { timestamps: true });
var City = (0, import_mongoose3.model)("citys", CitySchema);

// src/App/CitySearch/Repository/CitySearchRepository.ts
var CitySearchRepository = class {
  constructor(model6) {
    this.model = model6;
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
var import_mongoose4 = require("mongoose");
var CitySearchSchema = new import_mongoose4.Schema({
  cityId: { type: import_mongoose4.Schema.Types.ObjectId, ref: "citys" },
  technologyId: { type: import_mongoose4.Schema.Types.ObjectId, ref: "technologys" },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var CitySearch = (0, import_mongoose4.model)("citysearch", CitySearchSchema);

// src/App/TechSearch/Repository/TechSearchRepository.ts
var TechSearchRepository = class {
  constructor(model6) {
    this.model = model6;
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

// src/App/TechSearch/Entitie/TechSearch.ts
var import_mongoose5 = require("mongoose");
var TechSearchSchema = new import_mongoose5.Schema({
  technologyId: { type: import_mongoose5.Schema.Types.ObjectId, ref: "technologys" },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var TechSearch = (0, import_mongoose5.model)("techsearch", TechSearchSchema);

// src/App/Jobs/MakeJobs.ts
var MakeJobs = class {
  static getInstance() {
    const Repository = new JobsRepository(Jobs);
    const techRepository = new TechnologyRepository(Technology);
    const cityRepository = new CityRepository(City);
    const cityseachRepository = new CitySearchRepository(CitySearch);
    const techSeachRespository = new TechSearchRepository(TechSearch);
    const Service = new JobService(Repository, techRepository, cityRepository, cityseachRepository, techSeachRespository);
    const Controller = new JobsController(Service);
    return Controller;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeJobs
});

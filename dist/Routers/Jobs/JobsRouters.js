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

// src/Routers/Jobs/JobsRouters.ts
var JobsRouters_exports = {};
__export(JobsRouters_exports, {
  JobRouter: () => JobRouter
});
module.exports = __toCommonJS(JobsRouters_exports);
var import_express = require("express");

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
  constructor(model5) {
    this.model = model5;
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

// src/Utils/Validation/Jobs/JobSchemaValidation.ts
var yup = __toESM(require("yup"));
var JobsSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema2 = yup.object().shape({
        position: yup.string().required(),
        salary: yup.number().required(),
        website: yup.string().required(),
        company: yup.string().required(),
        description: yup.string().required(),
        link: yup.string().required()
      });
      try {
        yield userSchema2.validate(data);
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

// src/App/Jobs/Entitie/Jobs.ts
var import_mongoose = require("mongoose");
var import_mongoose_paginate_v2 = __toESM(require("mongoose-paginate-v2"));
var JobsSchema = new import_mongoose.Schema({
  position: { type: String, required: true, enum: ["junior", "pleno", "senior"], default: null },
  //junior, pleno , senior
  salary: { type: String, required: true },
  //salario
  jobcontract: { type: String, required: true, enum: ["clt", "pj"], default: null },
  //clt ou pj
  localtype: { type: String, required: true, enum: ["hibrido", "remoto", "presencial"], default: null },
  //hibrido , remoto, presencial
  city: { type: String, required: true },
  //cidade
  // UF: { type: String, required: true}, //Estado
  technology: [{ type: String, required: true }],
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
JobsSchema.plugin(import_mongoose_paginate_v2.default);
var Jobs = (0, import_mongoose.model)("jobs", JobsSchema);

// src/App/Technology/Repository/TechnologyRepository.ts
var TechnologyRepository = class {
  constructor(model5) {
    this.model = model5;
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
var import_mongoose2 = require("mongoose");
var TechnologySChema = new import_mongoose2.Schema({
  name: { type: String, require: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var Technology = (0, import_mongoose2.model)("technologys", TechnologySChema);

// src/App/CitySearch/Repository/CitySearchRepository.ts
var CitySearchRepository = class {
  constructor(model5) {
    this.model = model5;
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
var import_mongoose3 = require("mongoose");
var CitySearchSchema = new import_mongoose3.Schema({
  city: { type: String, required: true },
  technology: { type: String, required: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var CitySearch = (0, import_mongoose3.model)("citysearch", CitySearchSchema);

// src/App/User/Entities/User.ts
var import_mongoose4 = require("mongoose");
var userSchema = new import_mongoose4.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: import_mongoose4.Schema.Types.ObjectId, ref: "jobs", default: null }],
  history: [{ type: String, default: null }]
}, { timestamps: true });
var User = (0, import_mongoose4.model)("user", userSchema);

// src/App/User/Repository/UserRepository.ts
var UserRepository = class {
  constructor(model5) {
    this.model = model5;
  }
  FindByEmail(email) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findOne({ email });
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
  Create(data) {
    return __async(this, null, function* () {
      try {
        return yield this.model.create(data);
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FindAll() {
    return __async(this, null, function* () {
      try {
        return yield this.model.find();
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  // Set é parecido com pacth ja que ele substitui o valor antiga
  EditProfile(body, id) {
    return __async(this, null, function* () {
      return yield this.model.findByIdAndUpdate(
        id,
        { $set: { name: body.name, password: body.password } },
        { new: true }
      ).select("-_id name email");
    });
  }
  AddFavorites(favorite, id) {
    return __async(this, null, function* () {
      return yield this.model.findOneAndUpdate(
        { _id: id },
        { $push: { favorites: favorite } },
        { new: true }
      ).populate({ path: "favorites", model: "jobs" }).select("-password");
    });
  }
  // Precisa ser Each pra poder adicionar varios valores 
  AddHistory(valuesToSave, id) {
    return __async(this, null, function* () {
      return yield this.model.findOneAndUpdate(
        { _id: id },
        { $push: { history: { $each: valuesToSave } } },
        { new: true }
      );
    });
  }
  RemoveFavorite(favorite, id) {
    return __async(this, null, function* () {
      return yield this.model.findOneAndUpdate(
        { _id: id },
        { $pull: { favorites: favorite } },
        { new: true }
      ).populate({ path: "favorites", model: "jobs" }).select("-password");
    });
  }
  UserInfo(id) {
    return __async(this, null, function* () {
      return yield this.model.findById(id).select("-_id name email favorites history").populate({ path: "favorites", model: "jobs" });
    });
  }
};

// src/App/Jobs/MakeJobs.ts
var MakeJobs = class {
  static getInstance() {
    const Repository = new JobsRepository(Jobs);
    const techRepository = new TechnologyRepository(Technology);
    const cityseachRepository = new CitySearchRepository(CitySearch);
    const userRepository = new UserRepository(User);
    const Service = new JobService(Repository, techRepository, cityseachRepository, userRepository);
    const Controller2 = new JobsController(Service);
    return Controller2;
  }
};

// src/Utils/Middlewares/AuthMiddleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var AuthMiddleware = class {
  static handler(req, res, next) {
    return __async(this, null, function* () {
      const { headers } = req;
      if (!headers.authorization) {
        return res.status(STATUS_CODE.NON_AUTHORIZED).json(headers.authorization);
      }
      const [, token] = headers.authorization.split(" ");
      try {
        import_jsonwebtoken2.default.verify(token, process.env.JWT_SECRET_KEY);
      } catch (err) {
        return res.status(STATUS_CODE.NON_AUTHORIZED).json(err);
      }
      next();
    });
  }
};

// src/Routers/Jobs/JobsRouters.ts
var JobRouter = (0, import_express.Router)();
var Controller = MakeJobs.getInstance();
JobRouter.use(AuthMiddleware.handler);
JobRouter.get("/search", Controller.FilterFromController.bind(Controller));
JobRouter.post("/register", Controller.CreateFromController.bind(Controller));
JobRouter.get("/all", Controller.FindAll.bind(Controller));
JobRouter.get("/", Controller.Pagination.bind(Controller));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JobRouter
});

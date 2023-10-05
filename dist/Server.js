"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
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

// src/Index.ts
var import_express7 = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));

// src/Database/Database.ts
var import_mongoose = __toESM(require("mongoose"));
var DatabaseConfig = class {
  static initialize() {
    import_mongoose.default.connection.on("open", () => {
      console.log("                        .,,uod8B8bou,,.");
      console.log("              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.");
      console.log("         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||");
      console.log(`         !...:!TVBBBRPFT||||||||||!!^^"'    ||||`);
      console.log(`         !.......:!?|||||!!^^"'             ||||`);
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||  #connected         ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         `.........||||                    ,||||");
      console.log("          .;.......||||               _.-!!|||||");
      console.log("   .,uodWBBBBb.....||||       _.-!!|||||||||!':");
      console.log("!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....");
      console.log("!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   `.");
      console.log("!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     `.");
      console.log('!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"`;:::       `.');
      console.log("!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.");
      console.log("`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.");
      console.log("  `..........:::::::::::::::::::::::;iof688888888888b.     `YBBBP^'");
      console.log("    `........::::::::::::::::;iof688888888888888888888b.     `");
      console.log("      `......:::::::::;iof688888888888888888888888888888b.");
      console.log("        `....:::;iof688888888888888888888888888888888899fT!");
      console.log("          `..::!8888888888888888888888888888888899fT|!^\"'");
      console.log("            `' !!988888888888888888888888899fT|!^\"");
      console.log('                `!!8888888888888888899fT|!^"');
      console.log('                  `!988888888899fT|!^"');
      console.log('                    `!9899fT|!^"');
      console.log('                      `!^"');
    });
    import_mongoose.default.connect(process.env.DATABASE_URL);
  }
};

// src/Routers/index.ts
var import_express6 = require("express");

// src/Routers/User/UserRouters.ts
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

// src/Utils/Bcrypt.ts
var import_bcrypt = __toESM(require("bcrypt"));
var Bcrypt = class {
  static encrypt(text) {
    return import_bcrypt.default.hashSync(text, 8);
  }
  static compare(text, hash) {
    return import_bcrypt.default.compareSync(text, hash);
  }
};

// src/App/User/Service/UserService.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var UserService = class {
  constructor(repository) {
    this.repository = repository;
  }
  CreateFromService(data) {
    return __async(this, null, function* () {
      try {
        const userAlreadyExists = yield this.repository.FindByEmail(data.email);
        if (userAlreadyExists) {
          return MakeErrors("Usu\xE1rio ja existe", STATUS_CODE.BAD_REQUEST);
        }
        const hashedPassword = Bcrypt.encrypt(data.password);
        data.password = hashedPassword;
        return yield this.repository.Create(data);
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  EditProfile(body, token) {
    return __async(this, null, function* () {
      const [, tokenNovo] = token.split(" ");
      const decoded = import_jsonwebtoken.default.decode(tokenNovo);
      const { _id } = decoded._doc;
      try {
        const hashedPassword = Bcrypt.encrypt(body.password);
        body.password = hashedPassword;
        const EditUser = yield this.repository.EditProfile(body, _id);
        return EditUser;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  AddFavorites(favorite, token) {
    return __async(this, null, function* () {
      const [, tokenNovo] = token.split(" ");
      const decoded = import_jsonwebtoken.default.decode(tokenNovo);
      const { _id } = decoded._doc;
      try {
        const AddFavorite = yield this.repository.AddFavorites(favorite, _id);
        return AddFavorite;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  RemoveFavorite(favorite, token) {
    return __async(this, null, function* () {
      const [, tokenNovo] = token.split(" ");
      const decoded = import_jsonwebtoken.default.decode(tokenNovo);
      const { _id } = decoded._doc;
      try {
        const result = yield this.repository.RemoveFavorite(favorite, _id);
        console.log("result  deleteado ==> ", result);
        return result;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  InfoUser(token) {
    return __async(this, null, function* () {
      const [, tokenNovo] = token.split(" ");
      const decoded = import_jsonwebtoken.default.decode(tokenNovo);
      const { _id } = decoded._doc;
      try {
        const userinfo = yield this.repository.UserInfo(_id);
        return userinfo;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};

// src/Utils/Validation/User/UserSchemaValidation.ts
var yup = __toESM(require("yup"));
var UserSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema2 = yup.object().shape({
        name: yup.string().notOneOf(["test", "teste", "tester", "admin", "user", "usuario", "adm", "user123", "user321"]).required(),
        email: yup.string().email().test("no-test-email", 'Email cannot contain "test" or "teste"', (value) => !(value && (value.includes("test") || value.includes("teste")))).required(),
        password: yup.string().required()
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

// src/Utils/Validation/User/EditSchemaValidation.ts
var yup2 = __toESM(require("yup"));
var EditSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema2 = yup2.object().shape({
        name: yup2.string().required(),
        password: yup2.string().required()
      });
      try {
        yield userSchema2.validate(data);
        return { message: "Usu\xE1rio editado com sucesso", status: 200 };
      } catch (error) {
        return { error: "Erro interno, preencha todos os campos", status: 500 };
      }
    });
  }
};

// src/App/User/Controller/UserController.ts
var UserController = class {
  constructor(service) {
    this.service = service;
  }
  CreateFromController(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const bodyValidation = yield UserSchemaValidation.isValid(body);
      if (bodyValidation.error) {
        return res.status(bodyValidation.status).json(bodyValidation.error);
      }
      try {
        const User2 = yield this.service.CreateFromService(body);
        return res.status(STATUS_CODE.CREATED).json(User2);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  EditProfile(req, res) {
    return __async(this, null, function* () {
      const { body } = req;
      const token = req.headers.authorization;
      const bodyValidation = yield EditSchemaValidation.isValid(body);
      if (bodyValidation.error) {
        return res.status(bodyValidation.status).json(bodyValidation.error);
      }
      try {
        const EditUser = yield this.service.EditProfile(body, token);
        return res.status(STATUS_CODE.OK).json(EditUser);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  AddFavorites(req, res) {
    return __async(this, null, function* () {
      const favorite = req.body.favorites;
      const token = req.headers.authorization;
      try {
        const Favorites = yield this.service.AddFavorites(favorite, token);
        return res.status(STATUS_CODE.CREATED).json(Favorites);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  RemoveFavorite(req, res) {
    return __async(this, null, function* () {
      const favoriteToRemove = req.params.id;
      const token = req.headers.authorization;
      try {
        const RemovedFavorite = yield this.service.RemoveFavorite(favoriteToRemove, token);
        return res.status(STATUS_CODE.OK).json(RemovedFavorite);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
  InfoUser(req, res) {
    return __async(this, null, function* () {
      const token = req.headers.authorization;
      try {
        const user = yield this.service.InfoUser(token);
        return res.status(STATUS_CODE.OK).json(user);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor" });
      }
    });
  }
};

// src/App/User/Entities/User.ts
var import_mongoose2 = require("mongoose");
var userSchema = new import_mongoose2.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: import_mongoose2.Schema.Types.ObjectId, ref: "jobs", default: null }],
  history: [{ type: String, default: null }]
}, { timestamps: true });
var User = (0, import_mongoose2.model)("user", userSchema);

// src/App/User/MakeUser.ts
var MakeUser = class {
  static getInstance() {
    const Repository = new UserRepository(User);
    const Service = new UserService(Repository);
    const Controller6 = new UserController(Service);
    return Controller6;
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

// src/Routers/User/UserRouters.ts
var userRoutes = (0, import_express.Router)();
var Controller = MakeUser.getInstance();
userRoutes.post("/register", Controller.CreateFromController.bind(Controller));
userRoutes.use(AuthMiddleware.handler);
userRoutes.get("/me", Controller.InfoUser.bind(Controller));
userRoutes.patch("/edit", Controller.EditProfile.bind(Controller));
userRoutes.post("/favorites", Controller.AddFavorites.bind(Controller));
userRoutes.delete("/favorites/remove/:id", Controller.RemoveFavorite.bind(Controller));

// src/Routers/Jobs/JobsRouters.ts
var import_express2 = require("express");

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
var yup3 = __toESM(require("yup"));
var JobsSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema2 = yup3.object().shape({
        position: yup3.string().required(),
        salary: yup3.number().required(),
        website: yup3.string().required(),
        company: yup3.string().required(),
        description: yup3.string().required(),
        link: yup3.string().required()
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
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
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
      const decoded = import_jsonwebtoken3.default.decode(tokenNovo);
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
var import_mongoose3 = require("mongoose");
var import_mongoose_paginate_v2 = __toESM(require("mongoose-paginate-v2"));
var JobsSchema = new import_mongoose3.Schema({
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
var Jobs = (0, import_mongoose3.model)("jobs", JobsSchema);

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
var import_mongoose4 = require("mongoose");
var TechnologySChema = new import_mongoose4.Schema({
  name: { type: String, require: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var Technology = (0, import_mongoose4.model)("technologys", TechnologySChema);

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
var import_mongoose5 = require("mongoose");
var CitySearchSchema = new import_mongoose5.Schema({
  city: { type: String, required: true },
  technology: { type: String, required: true },
  count: { type: Number, default: 0 }
}, { timestamps: true });
var CitySearch = (0, import_mongoose5.model)("citysearch", CitySearchSchema);

// src/App/Jobs/MakeJobs.ts
var MakeJobs = class {
  static getInstance() {
    const Repository = new JobsRepository(Jobs);
    const techRepository = new TechnologyRepository(Technology);
    const cityseachRepository = new CitySearchRepository(CitySearch);
    const userRepository = new UserRepository(User);
    const Service = new JobService(Repository, techRepository, cityseachRepository, userRepository);
    const Controller6 = new JobsController(Service);
    return Controller6;
  }
};

// src/Routers/Jobs/JobsRouters.ts
var JobRouter = (0, import_express2.Router)();
var Controller2 = MakeJobs.getInstance();
JobRouter.use(AuthMiddleware.handler);
JobRouter.get("/search", Controller2.FilterFromController.bind(Controller2));
JobRouter.post("/register", Controller2.CreateFromController.bind(Controller2));
JobRouter.get("/all", Controller2.FindAll.bind(Controller2));
JobRouter.get("/", Controller2.Pagination.bind(Controller2));

// src/Routers/Technology/TechnologyRoutes.ts
var import_express3 = require("express");

// src/Utils/Validation/Technology/TechnologySchemaValidation.ts
var yup4 = __toESM(require("yup"));
var TechnologySchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema2 = yup4.object().shape({
        name: yup4.string().required()
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

// src/App/Technology/MakeTechnology.ts
var MakeTechnology = class {
  static getInstance() {
    const Repository = new TechnologyRepository(Technology);
    const Service = new TechnologyService(Repository);
    const Controller6 = new TechnologyController(Service);
    return Controller6;
  }
};

// src/Routers/Technology/TechnologyRoutes.ts
var TechnologyRouter = (0, import_express3.Router)();
var Controller3 = MakeTechnology.getInstance();
TechnologyRouter.use(AuthMiddleware.handler);
TechnologyRouter.post("/register", Controller3.CreateFromController.bind(Controller3));
TechnologyRouter.get("/", Controller3.FindAllFromController.bind(Controller3));

// src/Routers/CitySearch/CitySearch.ts
var import_express4 = require("express");

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

// src/App/CitySearch/MakeCitySearch.ts
var MakeCitySearch = class {
  static getInstance() {
    const CitySearchrepository = new CitySearchRepository(CitySearch);
    const TechRepository = new TechnologyRepository(Technology);
    const Service = new CitySearchService(CitySearchrepository, TechRepository);
    const Controller6 = new CitySearchController(Service);
    return Controller6;
  }
};

// src/Routers/CitySearch/CitySearch.ts
var Search = (0, import_express4.Router)();
var Controller4 = MakeCitySearch.getInstance();
Search.use(AuthMiddleware.handler);
Search.get("/", Controller4.FindTopFiveLocal.bind(Controller4));

// src/Routers/Auth/Auth.ts
var import_express5 = require("express");

// src/App/Auth/Service/AuthService.ts
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
var AuthService = class {
  constructor(repository) {
    this.repository = repository;
  }
  Login(data) {
    return __async(this, null, function* () {
      try {
        const userAlreadyExists = yield this.repository.FindByEmail(data.email);
        if (!userAlreadyExists) {
          return MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED);
        }
        const passwordIsValid = Bcrypt.compare(data.password, userAlreadyExists.password);
        if (!passwordIsValid) {
          return MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED);
        }
        const { name, email } = userAlreadyExists;
        const payload = __spreadValues({}, userAlreadyExists);
        const secretKey = process.env.JWT_SECRET_KEY;
        const options = { expiresIn: "55m" };
        const token = import_jsonwebtoken4.default.sign(payload, secretKey, options);
        return { token, name, email };
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};

// src/Utils/Validation/Auth/AuthSchemaValidation.ts
var yup5 = __toESM(require("yup"));
var AuthSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const authSchema = yup5.object().shape({
        email: yup5.string().email().required(),
        password: yup5.string().required()
      });
      try {
        yield authSchema.validate(data);
        return { message: "Success", status: 200 };
      } catch (error) {
        return { error: "Unauthorized", status: 401 };
      }
    });
  }
};

// src/App/Auth/Controller/AuthController.ts
var AuthController = class {
  constructor(service) {
    this.service = service;
  }
  LoginController(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        const bodyValidation = AuthSchemaValidation.isValid(body);
        if ("error" in bodyValidation) {
          return res.status(STATUS_CODE.BAD_REQUEST).json(bodyValidation.error);
        }
        const result = yield this.service.Login(body);
        if ("error" in result) {
          return res.status(STATUS_CODE.NON_AUTHORIZED).json(result.error);
        }
        return res.status(STATUS_CODE.OK).json(result);
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
      }
    });
  }
};

// src/App/Auth/MakeAuth.ts
var MakeAuth = class {
  static getInstance() {
    const repository = new UserRepository(User);
    const service = new AuthService(repository);
    const controller = new AuthController(service);
    return controller;
  }
};

// src/Routers/Auth/Auth.ts
var userAuth = (0, import_express5.Router)();
var Controller5 = MakeAuth.getInstance();
userAuth.post("/", Controller5.LoginController.bind(Controller5));

// src/Routers/index.ts
var routes = (0, import_express6.Router)();
routes.use("/jobs", JobRouter);
routes.use("/technology", TechnologyRouter);
routes.use("/search", Search);
routes.use("/auth", userAuth);
routes.use("/user", userRoutes);

// src/Index.ts
import_dotenv.default.config();
DatabaseConfig.initialize();
var app = (0, import_express7.default)();
app.use(import_express7.default.json());
app.use(routes);

// src/Server.ts
var port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server Running at port ${port}`));

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

// src/Routers/User/UserRouters.ts
var UserRouters_exports = {};
__export(UserRouters_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(UserRouters_exports);
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
  constructor(model2) {
    this.model = model2;
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
var import_mongoose = require("mongoose");
var userSchema = new import_mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "jobs", default: null }],
  history: [{ type: String, default: null }]
}, { timestamps: true });
var User = (0, import_mongoose.model)("user", userSchema);

// src/App/User/MakeUser.ts
var MakeUser = class {
  static getInstance() {
    const Repository = new UserRepository(User);
    const Service = new UserService(Repository);
    const Controller2 = new UserController(Service);
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

// src/Routers/User/UserRouters.ts
var userRoutes = (0, import_express.Router)();
var Controller = MakeUser.getInstance();
userRoutes.post("/register", Controller.CreateFromController.bind(Controller));
userRoutes.use(AuthMiddleware.handler);
userRoutes.get("/me", Controller.InfoUser.bind(Controller));
userRoutes.patch("/edit", Controller.EditProfile.bind(Controller));
userRoutes.post("/favorites", Controller.AddFavorites.bind(Controller));
userRoutes.delete("/favorites/remove/:id", Controller.RemoveFavorite.bind(Controller));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});

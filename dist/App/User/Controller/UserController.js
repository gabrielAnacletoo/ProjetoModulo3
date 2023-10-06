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

// src/App/User/Controller/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);

// src/Utils/Validation/User/UserSchemaValidation.ts
var yup = __toESM(require("yup"));
var UserSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema = yup.object().shape({
        name: yup.string().notOneOf(["test", "teste", "tester", "admin", "user", "usuario", "adm", "user123", "user321"]).required(),
        email: yup.string().email().test("no-test-email", 'Email cannot contain "test" or "teste"', (value) => !(value && (value.includes("test") || value.includes("teste")))).required(),
        password: yup.string().required()
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

// src/Utils/Validation/User/EditSchemaValidation.ts
var yup2 = __toESM(require("yup"));
var EditSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema = yup2.object().shape({
        name: yup2.string().required(),
        password: yup2.string().required()
      });
      try {
        yield userSchema.validate(data);
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
        const User = yield this.service.CreateFromService(body);
        return res.status(STATUS_CODE.CREATED).json(User);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});

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

// src/App/Auth/MakeAuth.ts
var MakeAuth_exports = {};
__export(MakeAuth_exports, {
  MakeAuth: () => MakeAuth
});
module.exports = __toCommonJS(MakeAuth_exports);

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

// src/App/Auth/Service/AuthService.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

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

// src/App/Auth/Service/AuthService.ts
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
        const token = import_jsonwebtoken.default.sign(payload, secretKey, options);
        return { token, name, email };
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};

// src/Utils/Validation/Auth/AuthSchemaValidation.ts
var yup = __toESM(require("yup"));
var AuthSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const authSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeAuth
});

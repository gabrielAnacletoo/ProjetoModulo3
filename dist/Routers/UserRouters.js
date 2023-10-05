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

// src/Routers/UserRouters.ts
var UserRouters_exports = {};
__export(UserRouters_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(UserRouters_exports);
var import_express = require("express");

// src/App/User/Repository/UserRepository.ts
var UserRepository = class {
  constructor(model2) {
    this.model = model2;
  }
  FindByEmail(email) {
    return __async(this, null, function* () {
      return yield this.model.findOne({ email });
    });
  }
  FindById(id) {
    return __async(this, null, function* () {
      return yield this.model.findById(id);
    });
  }
  Create(data) {
    return __async(this, null, function* () {
      return yield this.model.create(data);
    });
  }
  FindAll() {
    return __async(this, null, function* () {
      return yield this.model.find();
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
var UserService = class {
  constructor(repository) {
    this.repository = repository;
  }
  CreateFromService(data) {
    return __async(this, null, function* () {
      const userAlreadyExists = yield this.repository.FindByEmail(data.email);
      if (userAlreadyExists) {
        return { error: "User Already Exists", status: 400 };
      }
      const hashedPassword = Bcrypt.encrypt(data.password);
      data.password = hashedPassword;
      return yield this.repository.Create(data);
    });
  }
};

// src/Utils/Validation/UserSchemaValidation.ts
var yup = __toESM(require("yup"));
var UserSchemaValidation = class {
  static isValid(data) {
    return __async(this, null, function* () {
      const userSchema2 = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
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
        const user = yield this.service.CreateFromService(body);
        return res.status(201).json(user);
      } catch (error) {
        return res.status(400).json({ error: "Preencha os dados corretamente" });
      }
    });
  }
};

// src/App/User/Entities/User.ts
var import_mongoose = require("mongoose");
var userSchema = new import_mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
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

// src/Routers/UserRouters.ts
var userRoutes = (0, import_express.Router)();
var { Controller } = MakeUser.getInstance();
userRoutes.post("/", Controller.CreateFromController.bind(Controller));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});

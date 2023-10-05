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

// src/App/User/Service/UserService.ts
var UserService_exports = {};
__export(UserService_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(UserService_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});

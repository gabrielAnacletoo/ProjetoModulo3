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

// src/App/Auth/Service/Auth.spec.ts
var import_vitest = require("vitest");

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

// src/App/Auth/Service/Auth.spec.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var FakeMockRepository = {
  FindByEmail: import_vitest.vi.fn(),
  FindById: import_vitest.vi.fn(),
  Create: import_vitest.vi.fn(),
  FindAll: import_vitest.vi.fn()
};
var sut = new AuthService(FakeMockRepository);
(0, import_vitest.describe)("AuthService", () => {
  (0, import_vitest.it)("should be able to return an error if email not found", () => __async(exports, null, function* () {
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.clearAllMocks();
    });
    const MockLogin = {
      email: "gah@anacleto.com.br",
      password: "123456"
    };
    import_vitest.vi.spyOn(FakeMockRepository, "FindByEmail").mockResolvedValue(null);
    const result = yield sut.Login(MockLogin);
    const expected = MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error if the password is wrong", () => __async(exports, null, function* () {
    const MockLogin = {
      email: "gah@anacleto.com.br",
      password: "123456"
    };
    const ReturnMock = {
      name: "Gabriel",
      _id: 1,
      password: "senharetornada"
    };
    import_vitest.vi.spyOn(FakeMockRepository, "FindByEmail").mockResolvedValue(ReturnMock);
    import_vitest.vi.spyOn(import_bcrypt2.default, "compareSync").mockReturnValueOnce(false);
    const result = yield sut.Login(MockLogin);
    const expected = MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("if email and password are validated it should return a token", () => __async(exports, null, function* () {
    const MockLogin = { email: "ga@anacleto.com.br", password: "senha123" };
    const MockReturn = {
      name: "Gabriel",
      _id: 1,
      password: "SenhaEncriptada",
      email: "ga@anacleto.com.br"
    };
    import_vitest.vi.spyOn(FakeMockRepository, "FindByEmail").mockResolvedValue(MockReturn);
    import_vitest.vi.spyOn(import_bcrypt2.default, "compareSync").mockReturnValue(true);
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "sign").mockReturnValue("Tokengigante");
    const result = yield sut.Login(MockLogin);
    const expected = { token: "Tokengigante", name: "Gabriel", email: "ga@anacleto.com.br" };
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const MockLogin = { email: "ga@anacleto.com.br", password: "senha123" };
    const MockError = new Error("Something went wrong");
    import_vitest.vi.spyOn(FakeMockRepository, "FindByEmail").mockRejectedValue(MockError);
    const result = yield sut.Login(MockLogin);
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/App/User/Service/UserService.spec.ts
var import_vitest = require("vitest");
var import_bcrypt2 = __toESM(require("bcrypt"));

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

// src/App/User/Service/UserService.spec.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var RepositoryMock = {
  FindByEmail: import_vitest.vi.fn(),
  FindAll: import_vitest.vi.fn(),
  FindById: import_vitest.vi.fn(),
  Create: import_vitest.vi.fn(),
  EditProfile: import_vitest.vi.fn(),
  AddFavorites: import_vitest.vi.fn()
};
var sut = new UserService(RepositoryMock);
(0, import_vitest.describe)("UserService", () => {
  (0, import_vitest.it)("should be able to return an error if user already exists", () => __async(exports, null, function* () {
    const paramsMock = { name: "Gabriel", email: "gah@anacleto.com", password: "senha123" };
    const MockReturn = {
      id: 123,
      name: "Gabriel",
      email: "gah@anacleto.com",
      password: "senha123",
      createdAt: "",
      updatedAt: ""
    };
    import_vitest.vi.spyOn(RepositoryMock, "FindByEmail").mockResolvedValue(MockReturn);
    const result = yield sut.CreateFromService(paramsMock);
    (0, import_vitest.expect)(result).toStrictEqual(MakeErrors("Usu\xE1rio ja existe", STATUS_CODE.BAD_REQUEST));
  }));
  (0, import_vitest.it)("should be able to create a user", () => __async(exports, null, function* () {
    const paramsMock = { name: "Gabriel", email: "gah@anacleto.com", password: "senha123" };
    const expected = {
      id: 1,
      name: "Gabriel",
      email: "gah@anacleto.com",
      password: "senha123",
      createdAt: "",
      updatedAt: ""
    };
    import_vitest.vi.spyOn(RepositoryMock, "FindByEmail").mockResolvedValue(null);
    import_vitest.vi.spyOn(RepositoryMock, "Create").mockResolvedValue(expected);
    import_vitest.vi.spyOn(import_bcrypt2.default, "hashSync").mockReturnValue("batatasEmaisBatatas");
    const result = yield sut.CreateFromService(paramsMock);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const paramsMock = { name: "Gabriel", email: "gah@anacleto.com", password: "senha123" };
    const MockError = new Error("Something went wrong");
    import_vitest.vi.spyOn(RepositoryMock, "FindByEmail").mockResolvedValue(null);
    import_vitest.vi.spyOn(RepositoryMock, "Create").mockRejectedValue(MockError);
    const result = yield sut.CreateFromService(paramsMock);
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});
(0, import_vitest.describe)("EditProfile", () => {
  (0, import_vitest.it)("It must be possible to edit a user profile", () => __async(exports, null, function* () {
    const BodyMock = {
      name: "Gabriel",
      password: "senha123"
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E";
    const [, tokenNovo] = token.split(" ");
    const decoded = {
      "$__": { activePaths: { paths: [Object], states: [Object] }, skipId: true },
      "$isNew": false,
      _doc: {
        _id: "65162567bba8c6264004a891",
        name: "anacletogah",
        email: "testeeee@teste.com",
        password: "$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.",
        favorites: [],
        history: ["1800", "1800", "1800", "pleno"],
        createdAt: "2023-09-29T01:16:23.203Z",
        updatedAt: "2023-09-29T02:11:25.995Z",
        __v: 0
      },
      iat: 1696012219,
      exp: 1696015519
    };
    const { _id } = decoded._doc;
    const MockEdited = {
      _id: "65162567bba8c6264004a891",
      name: "anacletogasah",
      email: "testeeee@teste.com",
      password: "$2b$08$MsCooVJ5tNCGnfd6t.Od6eED1BeTni7LqlVJ781VlQYISCjRW0kVC",
      favorites: [],
      history: [],
      createdAt: "",
      updatedAt: "",
      __v: 0
    };
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va");
    import_vitest.vi.spyOn(RepositoryMock, "EditProfile").mockResolvedValue(MockEdited);
    const result = yield sut.EditProfile(BodyMock, token);
    (0, import_vitest.expect)(result).toStrictEqual(MockEdited);
  }));
  (0, import_vitest.it)("should return an internal server error if it can't enter the try", () => __async(exports, null, function* () {
    const BodyMock = {
      name: "Gabriel",
      password: "senha123"
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E";
    const [, tokenNovo] = token.split(" ");
    const decoded = {
      "$__": { activePaths: { paths: [Object], states: [Object] }, skipId: true },
      "$isNew": false,
      _doc: {
        _id: "65162567bba8c6264004a891",
        name: "anacletogah",
        email: "testeeee@teste.com",
        password: "$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.",
        favorites: [],
        history: ["1800", "1800", "1800", "pleno"],
        createdAt: "2023-09-29T01:16:23.203Z",
        updatedAt: "2023-09-29T02:11:25.995Z",
        __v: 0
      },
      iat: 1696012219,
      exp: 1696015519
    };
    const { _id } = decoded._doc;
    const MockEdited = {
      _id: "65162567bba8c6264004a891",
      name: "anacletogasah",
      email: "testeeee@teste.com",
      password: "$2b$08$MsCooVJ5tNCGnfd6t.Od6eED1BeTni7LqlVJ781VlQYISCjRW0kVC",
      favorites: [],
      history: [],
      createdAt: "",
      updatedAt: "",
      __v: 0
    };
    const MockError = new Error("Something went wrong");
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va");
    import_vitest.vi.spyOn(RepositoryMock, "EditProfile").mockRejectedValue(MockError);
    const result = yield sut.EditProfile(BodyMock, token);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});
(0, import_vitest.describe)("Add to favorites", () => {
  (0, import_vitest.it)("it should be possible to add jobs to favorites", () => __async(exports, null, function* () {
    const favorites = "1232132132131313";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E";
    const [, tokenNovo] = token.split(" ");
    const decoded = {
      "$__": { activePaths: { paths: [Object], states: [Object] }, skipId: true },
      "$isNew": false,
      _doc: {
        _id: "65162567bba8c6264004a891",
        name: "anacletogah",
        email: "testeeee@teste.com",
        password: "$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.",
        favorites: [],
        history: ["1800", "1800", "1800", "pleno"],
        createdAt: "2023-09-29T01:16:23.203Z",
        updatedAt: "2023-09-29T02:11:25.995Z",
        __v: 0
      },
      iat: 1696012219,
      exp: 1696015519
    };
    const { _id } = decoded._doc;
    const MockValue = {
      _id: "65174602452b7a79679b2cdd",
      name: "anacletogah",
      email: "testeeee@teste.com.br",
      favorites: [
        {
          _id: "6516d478d6c472b0832a28a9",
          position: "pleno",
          salary: "9800",
          jobcontract: "clt",
          localtype: "presencial",
          city: "S\xE3o Paulo",
          technology: [],
          website: "www.indeed.com.br",
          company: "Ome Tech",
          companysize: "pequena",
          description: "Desenvolvedor pleno com experiencia",
          link: "www.indeed.com.br/pleno/vaga",
          createdAt: "2023-09-29T13:43:20.306Z",
          updatedAt: "2023-09-29T13:43:20.306Z",
          __v: 0
        }
      ],
      history: [],
      createdAt: "2023-09-29T21:47:46.977Z",
      updatedAt: "2023-09-29T23:49:21.965Z",
      __v: 0
    };
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va");
    import_vitest.vi.spyOn(RepositoryMock, "AddFavorites").mockResolvedValue(MockValue);
    const result = yield sut.AddFavorites(favorites, token);
    (0, import_vitest.expect)(result).toStrictEqual(MockValue);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const favorites = "1232132132131313";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE2MjU2N2JiYThjNjI2NDAwNGE4OTEiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDNjQ2s0cVVVdXNvc3FWVXRKYXZaSnVZdWtGLk51ZlUwU1lwWjFTUm9sYS9EZWRPMThYZUouIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6WyIxODAwIiwiMTgwMCIsIjE4MDAiLCJwbGVubyJdLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI5VDAxOjE2OjIzLjIwM1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI5VDAyOjExOjI1Ljk5NVoiLCJfX3YiOjB9LCJpYXQiOjE2OTYwMTIyMTksImV4cCI6MTY5NjAxNTUxOX0.1gvm5KPhcKa2GJmFpGGE5uwiPHwgVFFi4JtQDr4C56E";
    const [, tokenNovo] = token.split(" ");
    const decoded = {
      "$__": { activePaths: { paths: [Object], states: [Object] }, skipId: true },
      "$isNew": false,
      _doc: {
        _id: "65162567bba8c6264004a891",
        name: "anacletogah",
        email: "testeeee@teste.com",
        password: "$2b$08$3cCk4qUUusosqVUtJavZJuYukF.NufU0SYpZ1SRola/DedO18XeJ.",
        favorites: [],
        history: ["1800", "1800", "1800", "pleno"],
        createdAt: "2023-09-29T01:16:23.203Z",
        updatedAt: "2023-09-29T02:11:25.995Z",
        __v: 0
      },
      iat: 1696012219,
      exp: 1696015519
    };
    const { _id } = decoded._doc;
    const MockError = new Error("Something went wrong");
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(Bcrypt, "encrypt").mockResolvedValue("$2b$08$IeBRFDx5HX0Spg1DL.pY8uHzP17S5sQ9vhxPTgu7Zwoe.X4HVV.Va");
    import_vitest.vi.spyOn(RepositoryMock, "AddFavorites").mockRejectedValue(MockError);
    const result = yield sut.AddFavorites(favorites, token);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});

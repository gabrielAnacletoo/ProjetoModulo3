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

// src/App/Jobs/Service/JobService.spec.ts
var import_vitest = require("vitest");

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

// src/Utils/MakeErrors/MakeErrors.ts
function MakeErrors(message, status) {
  return {
    error: true,
    message,
    status
  };
}

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

// src/App/Jobs/Service/JobService.spec.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var FakeJobsRepository = {
  Create: import_vitest.vi.fn(),
  FindById: import_vitest.vi.fn(),
  Filter: import_vitest.vi.fn()
};
var FakeTechnologyRepository = {
  Create: import_vitest.vi.fn(),
  FindByName: import_vitest.vi.fn(),
  Filter: import_vitest.vi.fn(),
  IncrementCount: import_vitest.vi.fn()
};
var FakeUserRepository = {
  Create: import_vitest.vi.fn(),
  FindByName: import_vitest.vi.fn(),
  Filter: import_vitest.vi.fn(),
  IncrementCount: import_vitest.vi.fn(),
  AddHistory: import_vitest.vi.fn()
};
var FakeCitySearchRepository = {
  Create: import_vitest.vi.fn(),
  FindById: import_vitest.vi.fn(),
  FindByCityAndTech: import_vitest.vi.fn(),
  IncrementCount: import_vitest.vi.fn()
};
var sut = new JobService(FakeJobsRepository, FakeTechnologyRepository, FakeCitySearchRepository, FakeUserRepository);
(0, import_vitest.describe)("Tests JobService CreateFromService", () => {
  (0, import_vitest.it)("must be able to create a job", () => __async(exports, null, function* () {
    const paramsMock = {
      position: "junior",
      salary: "2000",
      jobcontract: "clt",
      localtype: "presencial",
      cityId: "650e43894b383bb1298bf574",
      technologyId: "650f7f36d4a302c7a4876ee7",
      website: "www.indeed.com.br",
      company: "Alfa Tech",
      companysize: "pequena",
      description: "Desenvolvedor junior com experiencia",
      link: "www.indeed.com.br/junior/vaga"
    };
    import_vitest.vi.spyOn(FakeJobsRepository, "Create").mockResolvedValue({
      _id: "650f7f48d4a302c7a4876eed",
      position: "junior",
      salary: "2000",
      jobcontract: "clt",
      localtype: "presencial",
      cityId: "650e43894b383bb1298bf574",
      technologyId: "650f7f36d4a302c7a4876ee7",
      website: "www.indeed.com.br",
      company: "Alfa Tech",
      companysize: "pequena",
      description: "Desenvolvedor junior com experiencia",
      link: "www.indeed.com.br/junior/vaga",
      createdAt: "2023-09-24T00:00:00.000Z",
      updatedAt: "2023-09-24T00:00:00.000Z",
      __v: 0
    });
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    const result = yield sut.CreateFromService(paramsMock);
    (0, import_vitest.expect)(result).toStrictEqual({
      _id: "650f7f48d4a302c7a4876eed",
      position: "junior",
      salary: "2000",
      jobcontract: "clt",
      localtype: "presencial",
      cityId: "650e43894b383bb1298bf574",
      technologyId: "650f7f36d4a302c7a4876ee7",
      website: "www.indeed.com.br",
      company: "Alfa Tech",
      companysize: "pequena",
      description: "Desenvolvedor junior com experiencia",
      link: "www.indeed.com.br/junior/vaga",
      createdAt: "2023-09-24T00:00:00.000Z",
      updatedAt: "2023-09-24T00:00:00.000Z",
      __v: 0
    });
  }));
  (0, import_vitest.it)("must return an error on failed creation", () => __async(exports, null, function* () {
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    const paramsMock = {
      position: "junior",
      salary: "2000",
      jobcontract: "clt",
      localtype: "presencial",
      cityId: "650e43894b383bb1298bf574",
      technologyId: "650f7f36d4a302c7a4876ee7",
      website: "www.indeed.com.br",
      company: "Alfa Tech",
      companysize: "pequena",
      description: "Desenvolvedor junior com experiencia",
      link: "www.indeed.com.br/junior/vaga"
    };
    const expected = MakeErrors("Essa vaga n\xE3o pode ser criada, preencha corretamente", STATUS_CODE.BAD_REQUEST);
    import_vitest.vi.spyOn(FakeJobsRepository, "Create").mockResolvedValue(null);
    const result = yield sut.CreateFromService(paramsMock);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const MockError = new Error("Something went wrong");
    const paramsMock = {
      position: "junior",
      salary: "2000",
      jobcontract: "clt",
      localtype: "presencial",
      cityId: "650e43894b383bb1298bf574",
      technologyId: "650f7f36d4a302c7a4876ee7",
      website: "www.indeed.com.br",
      company: "Alfa Tech",
      companysize: "pequena",
      description: "Desenvolvedor junior com experiencia",
      link: "www.indeed.com.br/junior/vaga"
    };
    import_vitest.vi.spyOn(FakeJobsRepository, "Create").mockRejectedValue(MockError);
    const result = yield sut.CreateFromService(paramsMock);
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});
(0, import_vitest.describe)("FilterFromService", () => {
  (0, import_vitest.it)("must be able to return query and increments when both cityId and technologyId are provided and existingSearch is true", () => __async(exports, null, function* () {
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM";
    const filter = { city: "Bauru", technology: "React" };
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
    const Findtrue = { _id: 123123, city: "Bauru", count: 2, technology: "React" };
    const incremented = { _id: 123123, city: "Bauru", count: 3, technology: "React" };
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue(Findtrue);
    import_vitest.vi.spyOn(FakeCitySearchRepository, "FindByCityAndTech").mockResolvedValue(Findtrue);
    import_vitest.vi.spyOn(FakeCitySearchRepository, "IncrementCount").mockResolvedValue(incremented);
    const result = yield sut.FilterFromService(filter, token);
    (0, import_vitest.expect)(result).toEqual({
      Incrementos: incremented,
      Consulta: Findtrue,
      Message: "Registros existentes incrementados com sucesso"
    });
  }));
  (0, import_vitest.it)("it should be possible to create a record if FindByCityAndTechIds is false", () => __async(exports, null, function* () {
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM";
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
    const filter = { city: "Bauru", technology: "React", count: 0 };
    const Findtrue = { _id: 123123, city: "Bauru", count: 2, technology: "React" };
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue(Findtrue);
    import_vitest.vi.spyOn(FakeCitySearchRepository, "FindByCityAndTech").mockResolvedValue(null);
    import_vitest.vi.spyOn(FakeCitySearchRepository, "Create").mockResolvedValue(filter);
    const result = yield sut.FilterFromService(filter, token);
    (0, import_vitest.expect)(result).toStrictEqual({
      Incrementos: filter,
      Consulta: `N\xE3o existem vagas em ${filter.city} com tecnlogia ${filter.technology}.`,
      Message: "Registro criado."
    });
  }));
  (0, import_vitest.it)("should return Technology not found if the name is not found", () => __async(exports, null, function* () {
    const filter = { technology: "React" };
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM";
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
    const expected = MakeErrors("Tecnologia n\xE3o encontrada", STATUS_CODE.NOT_FOUND);
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(FakeTechnologyRepository, "FindByName").mockResolvedValue(null);
    const result = yield sut.FilterFromService(filter, token);
    (0, import_vitest.expect)(result).toEqual(expected);
  }));
  (0, import_vitest.it)("must increase technology but show that there are no jobs with this technology", () => __async(exports, null, function* () {
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM";
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
    const IncrementedTechnology = [
      {
        _id: "6514cae1685426bd89d08d56",
        name: "PHP",
        count: 23,
        createdAt: "",
        updatedAt: "",
        __v: 0
      },
      {
        _id: "6514cc701405f9513e85220d",
        name: "React",
        count: 31,
        createdAt: "",
        updatedAt: "",
        __v: 0
      }
    ];
    const FindByNameTech = {
      technology: ["React", "PHP"]
    };
    const techFind = [
      {
        _id: "6514cae1685426bd89d08d56",
        name: "PHP",
        count: 26,
        createdAt: "",
        updatedAt: "",
        __v: 0
      },
      {
        _id: "6514cc701405f9513e85220d",
        name: "React",
        count: 35,
        createdAt: "",
        updatedAt: "",
        __v: 0
      }
    ];
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    import_vitest.vi.spyOn(FakeTechnologyRepository, "FindByName").mockResolvedValue(techFind);
    import_vitest.vi.spyOn(FakeTechnologyRepository, "IncrementCount").mockResolvedValue(IncrementedTechnology);
    import_vitest.vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue([]);
    const result = yield sut.FilterFromService(FindByNameTech, token);
    (0, import_vitest.expect)(result.Consulta).toEqual(`N\xE3o existem vagas para ${FindByNameTech.technology.join(",")}`);
  }));
  (0, import_vitest.it)("if the query exists then it should display the query and the technology increment", () => __async(exports, null, function* () {
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    const FindByNameTech = [
      {
        _id: "6514cc701405f9513e85220d",
        name: "React",
        count: 37,
        createdAt: "2023-09-28T00:44:32.875Z",
        updatedAt: "2023-10-02T16:19:47.425Z",
        __v: 0
      }
    ];
    const Consulta = {
      _id: "6514c564774be39577e81b5f",
      position: "pleno",
      salary: "1800",
      jobcontract: "pj",
      localtype: "remoto",
      city: "Bauru",
      technology: [
        "React"
      ],
      website: "www.indeed.com.br",
      company: "Omega Tech",
      companysize: "grande",
      description: "Desenvolvedor junior com experiencia",
      link: "www.indeed.com.br/junior/vaga",
      createdAt: "2023-09-28T00:14:28.122Z",
      updatedAt: "2023-09-28T00:14:28.122Z",
      __v: 0
    };
    const Incremented = {
      _id: "6514cc701405f9513e85220d",
      name: "React",
      count: 38,
      createdAt: "2023-09-28T00:44:32.875Z",
      updatedAt: "2023-10-02T18:23:19.140Z",
      __v: 0
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM";
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
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    let IncrementedTechnology = [];
    import_vitest.vi.spyOn(FakeJobsRepository, "Filter").mockResolvedValue(Consulta);
    import_vitest.vi.spyOn(FakeTechnologyRepository, "FindByName").mockResolvedValue(FindByNameTech);
    import_vitest.vi.spyOn(FakeTechnologyRepository, "IncrementCount").mockResolvedValue(Incremented);
    const result = yield sut.FilterFromService(FindByNameTech, token);
    const expected = { Incremento: IncrementedTechnology, Consulta };
    (0, import_vitest.expect)(result).toEqual(Consulta);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const Filter = { technology: "React" };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJmYXZvcml0ZXMiOiJpbml0IiwiaGlzdG9yeSI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJuYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImZhdm9yaXRlcyI6dHJ1ZSwiaGlzdG9yeSI6dHJ1ZSwiY3JlYXRlZEF0Ijp0cnVlLCJ1cGRhdGVkQXQiOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NTE3NDYwMjQ1MmI3YTc5Njc5YjJjZGQiLCJuYW1lIjoiYW5hY2xldG9nYWgiLCJlbWFpbCI6InRlc3RlZWVlQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiJDJiJDA4JGplZzR1VlEuSWZteUxjTllxMExJck9pM2xJZ1FJNi9OTzJleGF0UE4yOVREdU5PMUppSWdlIiwiZmF2b3JpdGVzIjpbXSwiaGlzdG9yeSI6W10sImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMjE6NDc6NDYuOTc3WiIsIl9fdiI6MH0sImlhdCI6MTY5NjAzMTM1MywiZXhwIjoxNjk2MDM0NjUzfQ.0BGGnllA8w4gT577baQEKz-up3b-HwFKaD7mgWVjXcM";
    const Incremented = { _id: 123, technology: "React", count: 3 };
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
    import_vitest.vi.spyOn(import_jsonwebtoken2.default, "decode").mockReturnValue(decoded);
    const MockError = new Error("Something went wrong");
    import_vitest.vi.spyOn(FakeJobsRepository, "Filter").mockRejectedValue(MockError);
    import_vitest.vi.spyOn(FakeCitySearchRepository, "FindByCityAndTech").mockRejectedValue(MockError);
    import_vitest.vi.spyOn(FakeCitySearchRepository, "IncrementCount").mockRejectedValue(MockError);
    const result = yield sut.FilterFromService(Filter, token);
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});

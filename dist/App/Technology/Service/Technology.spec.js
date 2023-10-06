"use strict";
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

// src/App/Technology/Service/Technology.spec.ts
var import_vitest = require("vitest");

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

// src/App/Technology/Service/Technology.spec.ts
var RepositoryFake = {
  Create: import_vitest.vi.fn(),
  IncrementCount: import_vitest.vi.fn(),
  FindById: import_vitest.vi.fn(),
  FindAll: import_vitest.vi.fn(),
  FindTopFiveGlobal: import_vitest.vi.fn(),
  FindByName: import_vitest.vi.fn()
};
var sut = new TechnologyService(RepositoryFake);
(0, import_vitest.describe)("Tecnlogy Service", () => {
  (0, import_vitest.it)("must be able to create a new technology", () => __async(exports, null, function* () {
    const parasMock = {
      name: "PHP",
      count: 0
    };
    const expected = {
      id: 1,
      name: "PHP",
      count: 1,
      createdAt: "",
      updatedAt: ""
    };
    (0, import_vitest.beforeEach)(() => {
      import_vitest.vi.resetAllMocks();
    });
    import_vitest.vi.spyOn(RepositoryFake, "FindByName").mockResolvedValue(null);
    import_vitest.vi.spyOn(RepositoryFake, "Create").mockResolvedValue(expected);
    const result = yield sut.CreateFromService(parasMock);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error if the tecnology already exists", () => __async(exports, null, function* () {
    const parasMock = {
      name: "PHP",
      count: 0
    };
    const MockReturn = {
      _id: 11,
      name: "PHP",
      count: 0
    };
    const expected = MakeErrors(`Tecnologia ${parasMock.name} j\xE1 existe.`, STATUS_CODE.BAD_REQUEST);
    import_vitest.vi.spyOn(RepositoryFake, "FindByName").mockResolvedValue(MockReturn);
    const result = yield sut.CreateFromService(parasMock);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error if the technology is not created", () => __async(exports, null, function* () {
    const MockValue = {
      name: "Phyton",
      test: "test"
    };
    const expected = MakeErrors("Tecnologia n\xE3o foi criada, preencha corretamente", STATUS_CODE.BAD_REQUEST);
    import_vitest.vi.spyOn(RepositoryFake, "FindByName").mockResolvedValue(null);
    import_vitest.vi.spyOn(RepositoryFake, "Create").mockResolvedValue(expected);
    const result = yield sut.CreateFromService(MockValue);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const MockData = { name: "Java" };
    const MockError = new Error("Something went wrong");
    import_vitest.vi.spyOn(RepositoryFake, "FindByName").mockRejectedValue(MockError);
    import_vitest.vi.spyOn(RepositoryFake, "Create").mockRejectedValue(MockError);
    const result = yield sut.CreateFromService(MockData);
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});
(0, import_vitest.describe)("FindAllFromService", () => __async(exports, null, function* () {
  (0, import_vitest.it)("should return an error if the function returns nothing", () => __async(exports, null, function* () {
    const expected = [
      {
        _id: "6514cac4685426bd89d08d4a",
        name: "C++",
        count: 7,
        createdAt: "",
        updatedAt: "",
        __v: 0
      },
      {
        _id: "6514caca685426bd89d08d4c",
        name: "Java",
        count: 0,
        createdAt: "",
        updatedAt: "",
        __v: 0
      }
    ];
    import_vitest.vi.spyOn(RepositoryFake, "FindAll").mockResolvedValue(expected);
    const result = yield sut.FindAllFromService();
    (0, import_vitest.expect)(result).toEqual(expected);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const MockError = new Error("Something went wrong");
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    import_vitest.vi.spyOn(RepositoryFake, "FindAll").mockRejectedValue(MockError);
    const result = yield sut.FindAllFromService();
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
}));

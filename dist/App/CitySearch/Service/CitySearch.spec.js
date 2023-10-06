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

// src/App/CitySearch/Service/CitySearch.spec.ts
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

// src/App/CitySearch/Service/CitySearch.spec.ts
var MockRepository = {
  Create: import_vitest.vi.fn(),
  FindByCityAndTech: import_vitest.vi.fn(),
  FindByCityByIds: import_vitest.vi.fn(),
  IncrementCount: import_vitest.vi.fn(),
  FindTopFivelocal: import_vitest.vi.fn(),
  FindByName: import_vitest.vi.fn()
};
var MockRepositoryTech = {
  FindTopFiveGlobal: import_vitest.vi.fn()
};
var sut = new CitySearchService(MockRepository, MockRepositoryTech);
(0, import_vitest.describe)("FindTopFiveLocal", () => {
  (0, import_vitest.it)("should return the most searched technology", () => __async(exports, null, function* () {
    const TopFiveGlobal = [
      {
        "name": "React",
        "count": 17
      },
      {
        "name": "Rust",
        "count": 11
      },
      {
        "name": "C++",
        "count": 7
      },
      {
        "name": "PHP",
        "count": 2
      },
      {
        "name": "Java",
        "count": 0
      }
    ];
    const TopFiveLocal = [
      {
        _id: "6514dcefe32199b344d57339",
        city: "S\xE3o Paulo",
        technology: "React",
        count: 10
      },
      {
        _id: "6514dc64d46af76690b3b8b4",
        city: "Bauru",
        technology: "React",
        count: 5
      },
      {
        _id: "6514dc73d46af76690b3b8be",
        city: "Curitiba",
        technology: "React",
        count: 2
      }
    ];
    const expected = { Top5Global: TopFiveGlobal, Top5PorLocal: TopFiveLocal };
    import_vitest.vi.spyOn(MockRepositoryTech, "FindTopFiveGlobal").mockResolvedValue(TopFiveGlobal);
    import_vitest.vi.spyOn(MockRepository, "FindTopFivelocal").mockResolvedValue(TopFiveLocal);
    const result = yield sut.FindTopFiveLocal();
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
  (0, import_vitest.it)("should return an error on the server if it doesn't pass within the try", () => __async(exports, null, function* () {
    const MockError = new Error("Something went wrong");
    const expected = MakeErrors(MockError.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
    import_vitest.vi.spyOn(MockRepositoryTech, "FindTopFiveGlobal").mockRejectedValue(MockError);
    const result = yield sut.FindTopFiveLocal();
    (0, import_vitest.expect)(result).toStrictEqual(expected);
  }));
});

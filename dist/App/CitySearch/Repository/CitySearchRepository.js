"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/App/CitySearch/Repository/CitySearchRepository.ts
var CitySearchRepository_exports = {};
__export(CitySearchRepository_exports, {
  CitySearchRepository: () => CitySearchRepository
});
module.exports = __toCommonJS(CitySearchRepository_exports);

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

// src/App/CitySearch/Repository/CitySearchRepository.ts
var CitySearchRepository = class {
  constructor(model) {
    this.model = model;
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
  FindByCityAndTech(city, technology) {
    return __async(this, null, function* () {
      const result = yield this.model.findOne({ city, technology });
      return result;
    });
  }
  FindByCityByIds(cityId) {
    return __async(this, null, function* () {
      try {
        const result = yield this.model.findOne({ cityId });
        return result;
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  IncrementCount(id) {
    return __async(this, null, function* () {
      return yield this.model.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        { new: true }
      );
    });
  }
  FindTopFivelocal(technology) {
    return __async(this, null, function* () {
      try {
        return this.model.find({ technology }).select("-createdAt -updatedAt -__v").sort({ count: -1 }).limit(5);
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FindByName(name) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findOne({ name });
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CitySearchRepository
});

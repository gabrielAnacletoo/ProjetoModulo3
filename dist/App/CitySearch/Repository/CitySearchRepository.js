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
var CitySearchRepository = class {
  constructor(model) {
    this.model = model;
  }
  Create(data) {
    return __async(this, null, function* () {
      return yield this.model.create(data);
    });
  }
  FindByCityAndTechIds(cityId, techId) {
    return __async(this, null, function* () {
      const result = yield this.model.findOne({ cityId, technologyId: techId });
      return result;
    });
  }
  IncrementCount(id) {
    return __async(this, null, function* () {
      return yield this.model.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        { new: true }
      ).select("-__v").populate({
        path: "cityId",
        select: "-_id",
        model: "citys"
      });
    });
  }
  FindFilters(data) {
    return __async(this, null, function* () {
      const { cityId, technologyId } = data;
      return this.model.find({
        $and: [
          { "cityId": cityId },
          { "technologyId": technologyId }
        ]
      });
    });
  }
  FindTopFivelocal() {
    return __async(this, null, function* () {
      return this.model.find().select("-createdAt -updatedAt -__v -_id").populate({
        path: "cityId",
        select: "-_id name",
        model: "citys"
      }).populate({
        path: "technologyId",
        select: "-_id name",
        model: "technologys"
      }).sort({ count: -1 }).limit(5);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CitySearchRepository
});

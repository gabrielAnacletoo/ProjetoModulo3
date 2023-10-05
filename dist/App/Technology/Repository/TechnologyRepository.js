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

// src/App/Technology/Repository/TechnologyRepository.ts
var TechnologyRepository_exports = {};
__export(TechnologyRepository_exports, {
  TechnologyRepository: () => TechnologyRepository
});
module.exports = __toCommonJS(TechnologyRepository_exports);
var TechnologyRepository = class {
  constructor(model) {
    this.model = model;
  }
  Create(data) {
    return __async(this, null, function* () {
      return yield this.model.create(data);
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
  FindById(id) {
    return __async(this, null, function* () {
      return yield this.model.findById(id);
    });
  }
  FindAll() {
    return __async(this, null, function* () {
      return yield this.model.find();
    });
  }
  FindTopFiveGlobal() {
    return __async(this, null, function* () {
      return this.model.find().select("-createdAt -updatedAt -__v -_id").sort({ count: -1 }).limit(5);
    });
  }
  FindByName(name) {
    return __async(this, null, function* () {
      return yield this.model.findOne({ name });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TechnologyRepository
});

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

// src/App/User/Repository/UserRepository.ts
var UserRepository_exports = {};
__export(UserRepository_exports, {
  UserRepository: () => UserRepository
});
module.exports = __toCommonJS(UserRepository_exports);

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

// src/App/User/Repository/UserRepository.ts
var UserRepository = class {
  constructor(model) {
    this.model = model;
  }
  FindByEmail(email) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findOne({ email });
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  FindById(id) {
    return __async(this, null, function* () {
      try {
        return yield this.model.findById(id);
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
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
  FindAll() {
    return __async(this, null, function* () {
      try {
        return yield this.model.find();
      } catch (error) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR);
      }
    });
  }
  // Set é parecido com pacth ja que ele substitui o valor antiga
  EditProfile(body, id) {
    return __async(this, null, function* () {
      return yield this.model.findByIdAndUpdate(
        id,
        { $set: { name: body.name, password: body.password } },
        { new: true }
      ).select("-_id name email");
    });
  }
  AddFavorites(favorite, id) {
    return __async(this, null, function* () {
      return yield this.model.findOneAndUpdate(
        { _id: id },
        { $push: { favorites: favorite } },
        { new: true }
      ).populate({ path: "favorites", model: "jobs" }).select("-password");
    });
  }
  // Precisa ser Each pra poder adicionar varios valores 
  AddHistory(valuesToSave, id) {
    return __async(this, null, function* () {
      return yield this.model.findOneAndUpdate(
        { _id: id },
        { $push: { history: { $each: valuesToSave } } },
        { new: true }
      );
    });
  }
  RemoveFavorite(favorite, id) {
    return __async(this, null, function* () {
      return yield this.model.findOneAndUpdate(
        { _id: id },
        { $pull: { favorites: favorite } },
        { new: true }
      ).populate({ path: "favorites", model: "jobs" }).select("-password");
    });
  }
  UserInfo(id) {
    return __async(this, null, function* () {
      return yield this.model.findById(id).select("-_id name email favorites history").populate({ path: "favorites", model: "jobs" });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRepository
});

import { Model } from 'mongoose';
import { TechnologyDocument } from "../Entities/Technology";
import { MakeErrors, MakeErrorsResponse } from '../../../Utils/MakeErrors/MakeErrors';


class TechnologyRepository {
  constructor(private model: Model<TechnologyDocument>) { }


  async Create(data: TechnologyDocument) {
    try {
      return await this.model.create(data)
    } catch (error: any) {
      return MakeErrors(error.message, 500)
    }
  }

  async IncrementCount(id: string) {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        { new: true }
      )
    } catch (error: any) {
      return MakeErrors(error.message, 500)
    }
  }


  async FindById(id: string) {
    try {
      return await this.model.findById(id)
    } catch (error: any) {
      return MakeErrors(error.message, 500)
    }
  }

  async FindAll() {
    try {
      return await this.model.find()
    } catch (error: any) {
      return MakeErrors(error.message, 500)
    }
  }

  async FindTopFiveGlobal() {
      return this.model.find().select('-createdAt -updatedAt -__v -_id').sort({ count: -1 }).limit(5)
  }


  async FindByName(names: string | string[]) {
    if (!Array.isArray(names)) {
      names = [names]; 
    }
    return await this.model.find({ name: { $in: names.map(name => new RegExp(`^${name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i')) } });
  }
  

}

export { TechnologyRepository }
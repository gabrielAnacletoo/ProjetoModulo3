import { Model } from 'mongoose'
import { CitySearchDocument } from '../Entitie/CitySearch'
import { MakeErrors } from '../../../Utils/MakeErrors/MakeErrors';
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode';

class CitySearchRepository {
  constructor(private model: Model<CitySearchDocument>) { }

  async Create(data: CitySearchDocument) {
    try {
      return await this.model.create(data)
    } catch (error: any) {
      return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  }


  async FindByCityAndTech(city: string, technology: string) {
      const result = await this.model.findOne({ city: city, technology: technology });
      return result
  }

  async FindByCityByIds(cityId: string) {
    try {
      const result = await this.model.findOne({ cityId: cityId });
      return result
    } catch (error: any) {
      return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  }


  async IncrementCount(id: string) {
      return await this.model.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        { new: true }
      )
  }


  async FindTopFivelocal(technology: string) {
    try {
      return this.model
        .find({ technology }).select("-createdAt -updatedAt -__v").sort({ count: -1 }).limit(5);
    } catch (error: any) {
      return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  }

  async FindByName(name: string) {
    try {
      return await this.model.findOne({ name });
    } catch (error: any) {
      return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  }


}

export { CitySearchRepository }
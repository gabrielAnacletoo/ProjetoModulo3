import { Model } from 'mongoose';
import { UserDocument } from '../Entities/User';
import { MakeErrors } from '../../../Utils/MakeErrors/MakeErrors';
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode';
interface UserEdit {
    name: string
    password: string
}
interface HistoryItem {
    value: any;
}

class UserRepository {
    constructor(private model: Model<UserDocument>) {}

    async FindByEmail(email: string) {
        try {
            return await this.model.findOne({ email })
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)        }
    }

    async FindById(id: string) {
        try {
            return await this.model.findById(id)

        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)        }
    }

    async Create(data: UserDocument) {
        try {
            return await this.model.create(data)
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)        }
    }

    async FindAll(){
       try {
        return await this.model.find();
       } catch (error: any) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)    }
    }

    // Set é parecido com pacth ja que ele substitui o valor antiga
    async EditProfile(body: UserEdit, id: string){
     return await this.model.findByIdAndUpdate(
    id, { $set: { name: body.name, password: body.password } }, { new: true }).select('-_id name email')
    }

    async AddFavorites(favorite: string, id: string){
        return await this.model.findOneAndUpdate(
            {_id: id },
            { $push: { favorites: favorite }},
            {new: true}
           ).populate({path: 'favorites', model: 'jobs'}).select('-password')
    }

    // Precisa ser Each pra poder adicionar varios valores 
    async AddHistory(valuesToSave: string[], id: string) {
        return await this.model.findOneAndUpdate(
            { _id: id },
            { $push: { history: { $each: valuesToSave } } },
            { new: true }
        );
    }
    
    async RemoveFavorite(favorite: string, id: string){
        return await this.model.findOneAndUpdate(
            {_id: id },
            { $pull: { favorites: favorite }},
            {new: true}
           ).populate({path: 'favorites', model: 'jobs'}).select('-password')
    }

    async UserInfo(id: string){
        return await this.model.findById(id).select('-_id name email favorites history').populate({path: 'favorites', model: 'jobs'})
    }
}

export { UserRepository }

import { Bcrypt } from "../../../Utils/Bcrypt";
import { UserRepository } from "../Repository/UserRepository";
import { UserDocument } from "../Entities/User";
import { MakeErrors } from "../../../Utils/MakeErrors/MakeErrors";
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode";
import JWT from "jsonwebtoken";


interface UserEdit {
    name: string
    password: string
}

class UserService {
  
    constructor(private repository: UserRepository) {}

    async CreateFromService(data: UserDocument) {

        try {
            const userAlreadyExists = await this.repository.FindByEmail(data.email)
            if(userAlreadyExists){
                return MakeErrors("Usuário ja existe", STATUS_CODE.BAD_REQUEST)
            }
            const hashedPassword = Bcrypt.encrypt(data.password);
            data.password = hashedPassword;
            return await this.repository.Create(data)
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
  
    }


    async EditProfile(body: UserEdit, token: string){
        const [, tokenNovo] = token.split(" ");
        const decoded: any = JWT.decode(tokenNovo)
        const { _id} = decoded._doc;
        
    try {
        //encryptar a senha 
        const hashedPassword = Bcrypt.encrypt(body.password);
        body.password = hashedPassword;
        const EditUser = await this.repository.EditProfile(body,_id)
        return EditUser;
    } catch (error: any) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
     }
 }
    

    async AddFavorites(favorite: string, token: string){
        const [, tokenNovo] = token.split(" ");
        const decoded: any = JWT.decode(tokenNovo);
        const { _id} = decoded._doc;

        try {
              const AddFavorite = await this.repository.AddFavorites(favorite,_id)
                return AddFavorite;
        }  catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
         }
    }
  
    async RemoveFavorite(favorite: string, token: string){
        const [, tokenNovo] = token.split(" ");
        const decoded: any = JWT.decode(tokenNovo);
        const { _id} = decoded._doc;

        try {
            const result = await this.repository.RemoveFavorite(favorite, _id)
            console.log("result  deleteado ==> ", result)
            return result;
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
         }
    }

    async InfoUser(token: string){
        const [, tokenNovo] = token.split(" ");
        const decoded: any = JWT.decode(tokenNovo);
        const { _id} = decoded._doc;
        try {
            const userinfo = await this.repository.UserInfo(_id)
            return userinfo;
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
         }
    }
}
export { UserService }
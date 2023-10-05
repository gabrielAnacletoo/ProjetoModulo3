import { UserRepository } from "./Repository/UserRepository";
import { UserService } from "./Service/UserService";
import { UserController } from "./Controller/UserController";
import { User } from "./Entities/User";

class MakeUser {
    static getInstance() {
        const Repository = new UserRepository(User)
        const Service = new UserService(Repository)
        const Controller = new UserController(Service)
        return Controller
    }
}

export { MakeUser }
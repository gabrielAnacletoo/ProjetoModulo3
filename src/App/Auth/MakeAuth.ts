import { User } from "../User/Entities/User"
import { UserRepository } from "../User/Repository/UserRepository"
import { AuthService } from "./Service/AuthService"
import { AuthController } from "./Controller/AuthController"

class MakeAuth {
  static getInstance() {
    const repository = new UserRepository(User)
    const service = new AuthService(repository)
    const controller = new AuthController(service)
    return controller
  }
}

export { MakeAuth }
import { Router } from 'express'
import { MakeAuth } from '../../App/Auth/MakeAuth'


const userAuth = Router();
const Controller = MakeAuth.getInstance()

userAuth.post('/', Controller.LoginController.bind(Controller))

export { userAuth }
import jwt from 'jsonwebtoken'
import { Bcrypt } from '../../../Utils/Bcrypt'
import { UserRepository } from '../../User/Repository/UserRepository'
import { MakeErrors } from '../../../Utils/MakeErrors/MakeErrors'
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode'


interface AuthData {
    email: string
    password: string
}

class AuthService {
    constructor(private repository: UserRepository) { }

    async Login(data: any) { //AuthData
        try {
            const userAlreadyExists = await this.repository.FindByEmail(data.email)
            if (!userAlreadyExists) {
                return MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED)
            }
            const passwordIsValid = Bcrypt.compare(data.password, (userAlreadyExists as AuthData).password)
            if (!passwordIsValid) {
                return MakeErrors("E-mail ou password incorretos", STATUS_CODE.NON_AUTHORIZED)
            }

            const { name, email } = userAlreadyExists as { name: string; email: string };
            const payload = { ...userAlreadyExists }
            const secretKey = process.env.JWT_SECRET_KEY as string
            const options = { expiresIn: '55m' }

            const token = jwt.sign(payload, secretKey, options)
            
            return { token, name, email }
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }
}

export { AuthService }

import * as yup from 'yup'
import { UserDocument } from '../../../App/User/Entities/User'
import { MakeErrors } from '../../MakeErrors/MakeErrors'
import { STATUS_CODE } from '../../StatusCode/StatusCode'
/*  Register validation */

class UserSchemaValidation{
    static async isValid(data: UserDocument) {
        const userSchema = yup.object().shape({
    name: yup.string().notOneOf(['test', 'teste', 'tester', 'admin', 'user', 'usuario', 'adm', 'user123', 'user321']).required(),
    email: yup.string().email().test('no-test-email', 'Email cannot contain "test" or "teste"', value => !(value && (value.includes('test') || value.includes('teste')))).required(),            
    password: yup.string().required()
        })
        try {
            await userSchema.validate(data)
            return {message: 'Success', status: 200}
        } catch (error) {
            return {error: 'you need to fill in all the fields', status: 404}
        }
    }
}

export {UserSchemaValidation}
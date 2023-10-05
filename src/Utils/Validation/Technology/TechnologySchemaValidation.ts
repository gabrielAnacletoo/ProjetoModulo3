import * as yup from 'yup'
import { TechnologyDocument } from '../../../App/Technology/Entities/Technology'

class TechnologySchemaValidation{
    static async isValid(data: TechnologyDocument){
        const userSchema = yup.object().shape({
            name: yup.string().required(),
        })

        try {
            await userSchema.validate(data)
            return {message: 'Success', status: 200}
        } catch (error) {
            return {error: 'you need to fill in all the fields', status: 404}
        }
    }
}

export {TechnologySchemaValidation}
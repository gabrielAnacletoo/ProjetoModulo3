import * as yup from 'yup'
import { CitySearchDocument } from '../../../App/CitySearch/Entitie/CitySearch'

class CitySearchSchemaValidation{
    static async isValid(data: CitySearchDocument){
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

export {CitySearchSchemaValidation}
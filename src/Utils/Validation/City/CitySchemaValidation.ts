import * as yup from 'yup'
import { CityDocument } from '../../../App/City/Entitie/City'

class CitySchemaValidation {
    static async isValid(data: CityDocument) {
        const citySchema = yup.object().shape({
            name: yup.string().required()
        }).strict();

        try {
            await citySchema.validate(data, { stripUnknown: true });
            return { message: 'Success', status: 200 };
        } catch (error) {
            return { error: 'You need to fill in all the required fields', status: 400 };
        }
    }
}


export {CitySchemaValidation}
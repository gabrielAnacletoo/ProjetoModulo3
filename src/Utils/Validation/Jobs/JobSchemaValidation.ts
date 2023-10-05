import * as yup from 'yup'
import { JobsDocument } from '../../../App/Jobs/Entitie/Jobs'
/*  Register validation */

class JobsSchemaValidation{
    static async isValid(data: JobsDocument){
        const userSchema = yup.object().shape({
            position: yup.string().required(),
            salary: yup.number().required(),
            website: yup.string().required(),
            company: yup.string().required(),
            description: yup.string().required(),
            link: yup.string().required(),
        })

        try {
            await userSchema.validate(data)
            return {message: 'Success', status: 200}
        } catch (error) {
            return {error: 'you need to fill in all the fields', status: 404}
        }
    }
}

export {JobsSchemaValidation}
import * as yup from 'yup'
interface UserEdit {
    name: string
    password: string
}

class EditSchemaValidation{
    static async isValid(data: UserEdit){
        const userSchema = yup.object().shape({
            name: yup.string().required(),
            password: yup.string().required()
        })

        try {
            await userSchema.validate(data)
            return {message: 'Usuário editado com sucesso', status: 200}
        } catch (error) {
            return {error: 'Erro interno, preencha todos os campos', status: 500}
        }
    }
}

export {EditSchemaValidation}
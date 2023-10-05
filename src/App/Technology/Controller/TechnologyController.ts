import { TechnologySchemaValidation } from '../../../Utils/Validation/Technology/TechnologySchemaValidation';
import { Request, Response } from 'express'
import { TechnologyService } from '../Service/TechnologyService';
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode';


class TechnologyController {
    constructor(private service: TechnologyService) { }

    async CreateFromController(req: Request, res: Response) {
        const { body } = req;

        const bodyValidation = await TechnologySchemaValidation.isValid(body);
        if (bodyValidation.error) {
            return res.status(bodyValidation.status).json(bodyValidation.error);
        }
        try {
            const Technology = await this.service.CreateFromService(body);
            return res.status(STATUS_CODE.CREATED).json(Technology);
        } catch (error) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ error: 'Preencha os dados corretamente' });
        }
    }


    async FindTopFiveGlobal(req: Request, res: Response) {
        try {
            const Result = await this.service.FindTopFiveGlobal()
            return res.status(STATUS_CODE.OK).json(Result);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
        }

    }

    async FindAllFromController(req: Request, res: Response){
        try {
            const Result = await this.service.FindAllFromService()
            return res.status(STATUS_CODE.OK).json(Result);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
        }
    }

}
export { TechnologyController }
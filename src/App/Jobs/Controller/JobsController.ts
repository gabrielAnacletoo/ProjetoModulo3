import { JobsSchemaValidation } from '../../../Utils/Validation/Jobs/JobSchemaValidation';
import { Request, Response } from 'express'
import { JobService } from "../Service/JobsService";
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode';

class JobsController {
    constructor(private service: JobService) { }

    async CreateFromController(req: Request, res: Response) {
        const { body } = req;
        const bodyValidation = await JobsSchemaValidation.isValid(body);
        if (bodyValidation.error) {
            return res.status(bodyValidation.status).json(bodyValidation.error);
        }
        try {
            const job = await this.service.CreateFromService(body);
            return res.status(STATUS_CODE.CREATED).json(job);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
        }
    }

    async FilterFromController(req: Request, res: Response) {
        const token = req.headers.authorization as string
        try {
            // Tento pegar tudo da query e colocar em params
            const params = req.query;

            // Criar um objeto de filtro
            const filter: { [key: string]: string } = {};
            for (const key in params) {
                filter[key] = params[key] as string;
            }
            // Filtrar as vagas
            const results = await this.service.FilterFromService(filter,token);

            // Retornar os resultados
            res.status(STATUS_CODE.OK).json(results)
        } catch (error: any) {
            return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
        }
    }

    async Pagination(req: Request, res: Response){
        try {
            const page = parseInt(req.query.page as string) // Defini 1 como padrão
            const limite = parseInt(req.query.limit as string) // 5 registro por paginas padrão

            const result = await this.service.Pagination(page,limite)
            return res.status(STATUS_CODE.OK).json(result)
        }  catch (error: any) {
            return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
        }
    }

    async FindAll(req: Request, res: Response){

        try {
        const result = await this.service.FindAll()
        return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {  
            return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
        }
    }


}
export { JobsController }
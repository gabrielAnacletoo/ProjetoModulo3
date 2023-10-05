
import { Request, Response } from 'express'
import { CitySearchService } from '../Service/CitySearchService';
import { STATUS_CODE } from '../../../Utils/StatusCode/StatusCode';


class CitySearchController {
    constructor(private service: CitySearchService) { }


    async FindTopFiveLocal(req: Request, res: Response) {
        try {
            const Result = await this.service.FindTopFiveLocal()
            console.log("Result controler ==> ", Result)
            return res.status(STATUS_CODE.OK).json(Result);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
        }

    }
    
}

export { CitySearchController }
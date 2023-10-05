import { TechnologyRepository } from "../Repository/TechnologyRepository";
import { TechnologyDocument } from "../Entities/Technology";
import { MakeErrors } from "../../../Utils/MakeErrors/MakeErrors";
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode";




class TechnologyService {
    constructor(private repository: TechnologyRepository) { }

    async CreateFromService(data: any) { //TechnologyDocument
        try {
            const FoundTech = await this.repository.FindByName(data.name)
            if(FoundTech){
                return MakeErrors(`Tecnologia ${data.name} já existe.`, STATUS_CODE.BAD_REQUEST)
            }
            const TechnologyCreated = await this.repository.Create(data)
            if (!TechnologyCreated) {
                return MakeErrors("Tecnologia não foi criada, preencha corretamente", STATUS_CODE.BAD_REQUEST)
            }
            return TechnologyCreated
        } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    
    async FindAllFromService(){
     try {
        const result = await this.repository.FindAll();
        return result;
     } catch (error: any) {
        return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
     }
    }
}

export { TechnologyService }
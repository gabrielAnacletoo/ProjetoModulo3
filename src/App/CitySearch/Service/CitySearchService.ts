import { TechnologyRepository } from "../../Technology/Repository/TechnologyRepository";
import { CitySearchRepository } from "../Repository/CitySearchRepository";
// import { CityRepository } from "../../City/Repository/CityRepository";
// import { CitySearchDocument } from "../Entitie/CitySearch";
import { MakeErrors } from "../../../Utils/MakeErrors/MakeErrors";
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode";



class CitySearchService {
    constructor(
        private CitySearchrepository: CitySearchRepository,
        private TechRepository: TechnologyRepository
    ) { }

      async FindTopFiveLocal() {
        try {
            const technology = await this.TechRepository.FindTopFiveGlobal();
            if (technology) {
                const technologyName = technology[0].name as string
                if(technologyName){
                const Result = await this.CitySearchrepository.FindTopFivelocal(technologyName)

                return { Top5Global: technology, Top5PorLocal: Result}
                }
             }
         } catch (error: any) {
            return MakeErrors(error.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
         }
    }
    
}
export { CitySearchService }
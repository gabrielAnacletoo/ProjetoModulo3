import { CitySearchController } from "./Controller/CitySearchController";
import { CitySearchService } from "./Service/CitySearchService";
import { TechnologyRepository } from "../Technology/Repository/TechnologyRepository";
import { Technology } from "../Technology/Entities/Technology";
// import { CityRepository } from "../City/Repository/CityRepository";
// import { City } from "../City/Entitie/City";
import { CitySearchRepository } from "./Repository/CitySearchRepository";
import { CitySearch } from "./Entitie/CitySearch";


class MakeCitySearch {
    static getInstance() {
        const CitySearchrepository = new CitySearchRepository(CitySearch)
        const TechRepository = new TechnologyRepository(Technology)
        // const Cityrepository = new CityRepository(City)
        const Service = new CitySearchService(CitySearchrepository,TechRepository)
        const Controller = new CitySearchController(Service)
        return Controller
    }
}

export { MakeCitySearch }
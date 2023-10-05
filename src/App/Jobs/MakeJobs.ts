import { JobsRepository } from "./Repository/JobsRepository";
import { JobsController } from "./Controller/JobsController";
import { JobService } from "./Service/JobsService";
import { Jobs } from "./Entitie/Jobs";
import { TechnologyRepository } from "../Technology/Repository/TechnologyRepository";
import { Technology } from "../Technology/Entities/Technology";
import { CitySearchRepository } from "../CitySearch/Repository/CitySearchRepository";
import { CitySearch } from "../CitySearch/Entitie/CitySearch";
import { User } from "../User/Entities/User";
import { UserRepository } from "../User/Repository/UserRepository";

class MakeJobs {
    static getInstance() {
        const Repository = new JobsRepository(Jobs)
        const techRepository = new TechnologyRepository(Technology)
        const cityseachRepository = new CitySearchRepository(CitySearch)
        const userRepository = new UserRepository(User)
        const Service = new JobService(Repository,techRepository,cityseachRepository,userRepository)
        const Controller = new JobsController(Service)
        return Controller
    }
}

export { MakeJobs }
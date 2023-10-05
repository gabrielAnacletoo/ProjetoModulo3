import { TechnologyRepository } from "./Repository/TechnologyRepository";
import { TechnologyController } from "./Controller/TechnologyController";
import { TechnologyService } from "./Service/TechnologyService";
import { Technology } from "./Entities/Technology";

class MakeTechnology {
    static getInstance() {
        const Repository = new TechnologyRepository(Technology)
        const Service = new TechnologyService(Repository)
        const Controller = new TechnologyController(Service)
        return Controller
    }
}

export { MakeTechnology }
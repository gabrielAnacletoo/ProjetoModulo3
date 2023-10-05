import { Router } from "express";
import { MakeJobs } from "../../App/Jobs/MakeJobs";
import { AuthMiddleware } from "../../Utils/Middlewares/AuthMiddleware";
const JobRouter = Router();
const Controller = MakeJobs.getInstance()

JobRouter.use(AuthMiddleware.handler)
// Rota para Pesquisar Vagas com filtros 
JobRouter.get("/search", Controller.FilterFromController.bind(Controller))
// Registrar uma  vaga
JobRouter.post("/register", Controller.CreateFromController.bind(Controller))
// Rota para listar todas as vagas 
JobRouter.get("/all", Controller.FindAll.bind(Controller))
//listar todas por paginas
JobRouter.get("/", Controller.Pagination.bind(Controller))
export { JobRouter }

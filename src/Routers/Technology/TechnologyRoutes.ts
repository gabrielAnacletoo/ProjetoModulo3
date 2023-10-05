import { Router } from "express";
import { MakeTechnology } from "../../App/Technology/MakeTechnology";
import { AuthMiddleware } from "../../Utils/Middlewares/AuthMiddleware";

const TechnologyRouter = Router();
const Controller = MakeTechnology.getInstance()

TechnologyRouter.use(AuthMiddleware.handler)
// Rota para Registrar Tecnologias 
TechnologyRouter.post("/register", Controller.CreateFromController.bind(Controller))
// Rota para Listar todas as tecnologias 
TechnologyRouter.get("/", Controller.FindAllFromController.bind(Controller))
export { TechnologyRouter }

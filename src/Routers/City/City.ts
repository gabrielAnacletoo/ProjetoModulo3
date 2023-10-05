import { Router } from "express";
import { MakeCity } from "../../App/City/MakeCity";
import { AuthMiddleware } from "../../Utils/Middlewares/AuthMiddleware";

const CityRouter = Router();
const Controller  = MakeCity.getInstance()

CityRouter.use(AuthMiddleware.handler)
// Rota para pesquisar cidade por nome 
// CityRouter.post("/register", Controller.CreateFromController.bind(Controller))
// Rota para Registrar Cidades 
CityRouter.post("/register", Controller.CreateFromController.bind(Controller))
// Rota para Listar todas as cidades 
CityRouter.get("/", Controller.FindAllFromController.bind(Controller))


export { CityRouter }

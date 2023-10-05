import { Router } from "express";
import { MakeCitySearch } from "../../App/CitySearch/MakeCitySearch";
import { AuthMiddleware } from "../../Utils/Middlewares/AuthMiddleware";
const Search = Router();
const Controller  = MakeCitySearch.getInstance()

Search.use(AuthMiddleware.handler)
// Retorna os top 5 por local
Search.get("/", Controller.FindTopFiveLocal.bind(Controller))

export { Search }

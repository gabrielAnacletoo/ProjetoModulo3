import { Router } from "express";
import { userRoutes } from "./User/UserRouters";
import { JobRouter } from "./Jobs/JobsRouters";
import { TechnologyRouter } from "./Technology/TechnologyRoutes";
import { Search } from "./CitySearch/CitySearch";
import { userAuth } from "./Auth/Auth";
const routes = Router();


routes.use("/jobs", JobRouter)
routes.use("/technology", TechnologyRouter)
routes.use("/search", Search)
routes.use("/auth" , userAuth)
routes.use("/user", userRoutes)


export { routes }
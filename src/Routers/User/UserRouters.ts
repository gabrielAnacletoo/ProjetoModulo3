import { Router } from "express";
import { MakeUser } from "../../App/User/MakeUser";
import { AuthMiddleware } from "../../Utils/Middlewares/AuthMiddleware";

const userRoutes = Router();
const Controller = MakeUser.getInstance()

userRoutes.post("/register", Controller.CreateFromController.bind(Controller))
userRoutes.use(AuthMiddleware.handler)
// Informações do usuário
userRoutes.get("/me", Controller.InfoUser.bind(Controller))
// Editar informações do perfil de usuário
userRoutes.patch("/edit", Controller.EditProfile.bind(Controller))
// Adicionar uma vaga aos favoritos
userRoutes.post("/favorites", Controller.AddFavorites.bind(Controller))
// Remover um favorito
userRoutes.delete("/favorites/remove/:id", Controller.RemoveFavorite.bind(Controller))

export { userRoutes }

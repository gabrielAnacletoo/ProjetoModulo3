import { UserSchemaValidation } from "../../../Utils/Validation/User/UserSchemaValidation";
import { Request, Response } from 'express'
import { UserService } from "../Service/UserService";
import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode";
import { EditSchemaValidation } from "../../../Utils/Validation/User/EditSchemaValidation";


class UserController {
  constructor(private service: UserService) { }

  async CreateFromController(req: Request, res: Response) {
    const { body } = req;
    const bodyValidation = await UserSchemaValidation.isValid(body);
    if (bodyValidation.error) {
      return res.status(bodyValidation.status).json(bodyValidation.error);
    }
    try {
      const User = await this.service.CreateFromService(body);
      return res.status(STATUS_CODE.CREATED).json(User);
    } catch (error) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
    }
  }

  async EditProfile(req: Request, res: Response){
    const { body } = req;
    const token = req.headers.authorization as string

      const bodyValidation = await EditSchemaValidation.isValid(body)
      if (bodyValidation.error) {
        return res.status(bodyValidation.status).json(bodyValidation.error);
      }

      try {
        const EditUser = await this.service.EditProfile(body,token)
        return res.status(STATUS_CODE.OK).json(EditUser)
      } catch (error) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
      }
  }

  async AddFavorites(req: Request, res: Response){
    const favorite = req.body.favorites
    const token = req.headers.authorization as string
    try {
      const Favorites = await this.service.AddFavorites(favorite,token);
      return res.status(STATUS_CODE.CREATED).json(Favorites);
    } catch (error) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
    }

  }

  async RemoveFavorite(req: Request, res: Response){
    const favoriteToRemove = req.params.id; 
    const token = req.headers.authorization as string
    try {
      const RemovedFavorite = await this.service.RemoveFavorite(favoriteToRemove, token);
      return res.status(STATUS_CODE.OK).json(RemovedFavorite);
    } catch (error) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
    }
  }

  async InfoUser(req: Request, res: Response){
    const token = req.headers.authorization as string
    try {
      const user = await this.service.InfoUser(token)
      return res.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor' });
    }
  }
}

export { UserController }
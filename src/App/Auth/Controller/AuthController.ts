import { STATUS_CODE } from "../../../Utils/StatusCode/StatusCode"
import { AuthSchemaValidation } from "../../../Utils/Validation/Auth/AuthSchemaValidation"
import { AuthService } from "../Service/AuthService"
import { Request , Response} from "express"

class AuthController {
  constructor(private service: AuthService) {}

  async LoginController(req: Request, res: Response) {
 try {
  const { body } = req
  const bodyValidation = AuthSchemaValidation.isValid(body)
  if ('error' in bodyValidation) {
    return res.status(STATUS_CODE.BAD_REQUEST).json(bodyValidation.error)
  }
  const result = await this.service.Login(body);
  if ('error' in result) {
    return res.status(STATUS_CODE.NON_AUTHORIZED).json(result.error);
  }
  return res.status(STATUS_CODE.OK).json(result)
 } catch (error) {
  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
 }
  }
}

export { AuthController }
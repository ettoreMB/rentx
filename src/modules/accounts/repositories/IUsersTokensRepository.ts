import { UserTokens } from "../infra/typeorm/entities/UserTokens";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository  {
  create({user_id,  refresh_token, expires_date, }:ICreateUserTokenDTO):Promise<UserTokens>
}

export {IUsersTokensRepository }
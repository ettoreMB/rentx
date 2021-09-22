import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    driver_license,
    avatar
  }: User):IUserResponseDTO {
   
      return {
        id,
        name,
        email,
        driver_license,
        avatar
      }
  }

}


export { UserMap }
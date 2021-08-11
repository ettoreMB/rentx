import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"

import { compare  } from 'bcryptjs';
import {sign} from 'jsonwebtoken'
import { AppError } from "../../../../errors/AppErrors";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({email, password}:IRequest): Promise<IResponse> {

    const user =  await this.usersRepository.findByEmail(email);
    if(!user) {
      throw new AppError("Email or Password is Inconrrect");
      
    }

    
    const passwordMatch =  await compare(password, user.password);
    if(!passwordMatch) {
      throw new AppError("Email or Password is Inconrrect");
    }

    const token = sign({},"c6f19e983b29b0c06eeecfb18382493a", {
      subject: user.id,
      expiresIn: "1d",
    });
    const tokenReturn: IResponse = {
      token, 
      user : {
        name: user.name, 
        email: user.email,
      }
    }

    return tokenReturn

    
  }
}

export { AuthenticateUserCase }
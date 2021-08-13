import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"

import { compare  } from 'bcryptjs';
import {sign} from 'jsonwebtoken'
import { AppError } from "../../../../shared/errors/AppErrors";


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

    const token = sign({},"6ede2e6e-1e7c-4b9e-8c36-36e9ad4b8a35", {
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
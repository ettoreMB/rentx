import { inject, injectable } from "tsyringe"
import auth from "@config/auth";
import { compare  } from 'bcryptjs';
import {sign} from 'jsonwebtoken'

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { AppError } from "@shared/errors/AppErrors";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";




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
  refresh_token: string;
}

@injectable()
class AuthenticateUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRespository:IUsersTokensRepository,
    @inject("DayjSDateProvider")
    private dayJsDateProvider: IDateProvider,

  ){}

  async execute({email, password}:IRequest): Promise<IResponse> {
    const user =  await this.usersRepository.findByEmail(email);
    const {
      secret_refresh_token,
      secret_token,
      expires_in_token,
      expires_in_refresToken,
      expires_refresh_token_days
    } = auth

    if(!user) {
      throw new AppError("Email or Password is Inconrrect");
      
    }

    
    const passwordMatch =  await compare(password, user.password);
    if(!passwordMatch) {
      throw new AppError("Email or Password is Inconrrect");
    }

    const token = sign({},secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({email}, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresToken,
    });

    const refresh_expires_token_date = this.dayJsDateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRespository.create({
      user_id: user.id,
      refresh_token,
      expires_in: refresh_expires_token_date
    })

    const tokenReturn: IResponse = {
      token, 
      user : {
        name: user.name, 
        email: user.email,
      },
      refresh_token
    }

    return tokenReturn

    
  }
}

export { AuthenticateUserCase }
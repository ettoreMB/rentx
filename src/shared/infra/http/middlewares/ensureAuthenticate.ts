import { Response, Request, NextFunction } from "express"
import { verify } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppErrors";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate (req: Request, res: Response, next:NextFunction){

  const authHeader = req.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository()

  if(!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  const [,  token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload

    const usersRepository = new UsersRepository();

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if(!user) {
      throw new AppError("User Doesn't Exists", 401);
    }

    
    req.user = {
      id: user_id
    }
    
    next();

  } catch (error) {
    
    throw new AppError("Invalid Token", 401);
    
  }
  
}
import { Response, Request, NextFunction } from "express"
import { verify } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppErrors";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate (req: Request, res: Response, next:NextFunction){

  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  const [,  token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "6ede2e6e-1e7c-4b9e-8c36-36e9ad4b8a35") as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if(!user) {
      throw new AppError("User Doesn't Exists", 401);
    }

    
    req.user = {
      id: user_id
    }

    next();

  } catch (error) {
    throw new AppError("Inavalid Token", 401);
    
  }
  
}
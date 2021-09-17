import { inject, injectable } from "tsyringe";

import { hash } from "bcryptjs";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  token: string,
  password: string,
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DayjSDateProvider")
    private dayJSDateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ){}

  async execute({token, password}:IRequest):Promise<void> {

    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if(!userToken) {
      throw new AppError('Invalid Token!');
    }

    if(
      this.dayJSDateProvider.compareIfBefore(
        userToken.expires_in,
        this.dayJSDateProvider.dateNow()
        )
      ) {
      throw new AppError('Token Expired!');
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase}
import { inject, injectable } from "tsyringe";

import { v4 as uuidV4} from 'uuid'
import { AppError } from "@shared/errors/AppErrors";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


@injectable()
class SendForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private  usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjSDateProvider")
    private dateProvider: IDateProvider,
  ){ }
  async execute(email: string){
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("User not Found!");
    }

    const token = uuidV4();
    const expires_in = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_in,
    });

    

  }
}

export {SendForgotPasswordUseCase}
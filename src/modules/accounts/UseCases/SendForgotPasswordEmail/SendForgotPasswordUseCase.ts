import { inject, injectable } from "tsyringe";
import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid'
import { AppError } from "@shared/errors/AppErrors";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";


@injectable()
class SendForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjSDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider,

  ) { }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")

    if (!user) {
      throw new AppError("User not Found!");
    }

    const token = uuidV4();
    const expires_in = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_in,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`

    }

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templatePath
    );



  }
}

export { SendForgotPasswordUseCase }
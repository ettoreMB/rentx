import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';
import { AppError } from "@shared/errors/AppErrors";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";



@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('User Already Exists')
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license
    });
  }
}

export { CreateUserUseCase }
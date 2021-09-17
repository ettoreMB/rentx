import { AppError } from "@shared/errors/AppErrors";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";


import { AuthenticateUserCase } from "./authenticateUserUseCase"
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayJSDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

let dayJSDateProvider: DayJSDateProvider;
let authenticateUserUseCase: AuthenticateUserCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepository: UsersTokensRepositoryInMemory;
let createUserCase: CreateUserUseCase;

describe('Authenticate User test', () => {
  beforeEach( () => {
    dayJSDateProvider = new DayJSDateProvider()
    usersTokenRepository =  new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserCase(usersRepositoryInMemory, usersTokenRepository, dayJSDateProvider);
    createUserCase = new CreateUserUseCase(usersRepositoryInMemory);
  })
  it('Should Be Able to authenticate an User',async  () => {
    const user:ICreateUserDTO = {
      driver_license:"000123",
      name: "Jhon Doe",
      email: 'Jhon@Email.com',
      password: '123456'
    }

    await createUserCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty('token')
  });

  it('Should not be able to authenticate an invalid User',async  () => {

    await expect(
       authenticateUserUseCase.execute({
        email: 'fake@email.com',
        password: '123',
      })
    ).rejects.toEqual(new AppError("Email or password is incorrect"))
  })

  it('Should not be able to authenticate with incorrect password',async  () => {
    const user:ICreateUserDTO = {
      driver_license:"000123",
      name: "Jhon Doe",
      email: 'fake@.com',
      password: '123456'
    }

    await createUserCase.execute(user);

    await expect( 
        authenticateUserUseCase.execute({
        email: user.email,
        password: 'Incorrect Password'
      })
    ).rejects.toEqual(new AppError("Email or password is incorrect"));
  })
})
import { AppError } from "@errors/AppErrors";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDto";
import { UsersRespositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";


import { AuthenticateUserCase } from "./authenticateUserUseCase"

let autheticateUserUseCase: AuthenticateUserCase;
let usersRepositoryInMemory: UsersRespositoryInMemory;

let createUserCase: CreateUserUseCase;

describe('Authenticate User test', () => {
  beforeEach( () => {
    usersRepositoryInMemory = new UsersRespositoryInMemory();
    autheticateUserUseCase = new AuthenticateUserCase(usersRepositoryInMemory);
    createUserCase = new CreateUserUseCase(usersRepositoryInMemory);
  })
  it('Should Be Able to autjenticate an User',async  () => {
    const user:ICreateUserDTO = {
      driver_license:"000123",
      name: "Jhon Doe",
      email: 'Jhon@Email.com',
      password: '123456'
    }

    await createUserCase.execute(user);

    const result = await autheticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty('token')
  });

  it('Should not be able to authenticate an invalid User',async  () => {

    expect(async () => {
      await autheticateUserUseCase.execute({
        email: 'fake@email.com',
        password: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to authenticate with incorret password',async  () => {

    expect(async () => {
      const user:ICreateUserDTO = {
        driver_license:"000123",
        name: "Jhon Doe",
        email: 'fake@.com',
        password: '123456'
      }
  
      await createUserCase.execute(user);

      await autheticateUserUseCase.execute({
        email: user.email,
        password: 'Incorrect Password'
      });
      
    }).rejects.toBeInstanceOf(AppError);
  })
})
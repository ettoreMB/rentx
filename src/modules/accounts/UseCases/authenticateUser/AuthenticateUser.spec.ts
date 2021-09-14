import { AppError } from "@shared/errors/AppErrors";
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
  it('Should Be Able to authenticate an User',async  () => {
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

    await expect(
       autheticateUserUseCase.execute({
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
        autheticateUserUseCase.execute({
        email: user.email,
        password: 'Incorrect Password'
      })
    ).rejects.toEqual(new AppError("Email or password is incorrect"));
  })
})
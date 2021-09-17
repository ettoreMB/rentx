import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJSDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayJSDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/InMemory/MailProviderInMemory";

import { AppError } from "@shared/errors/AppErrors";
import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";

let sendForgotEmilPasswordUseCase: SendForgotPasswordUseCase;
let mailProvider: MailProviderInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJSDateProvider;

describe('Send forgot email test', ()=> {
   beforeEach(() => {
     
    usersRepositoryInMemory =  new UsersRepositoryInMemory();
    dateProvider = new DayJSDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotEmilPasswordUseCase =  new SendForgotPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
      );
   })

   it('Should Be able to send an email to user', async () => {
    const sendEmail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "avzonbop@ospo.pr",
      name: "Blanche Curry",
      password: "1234",
    });

    await sendForgotEmilPasswordUseCase.execute("avzonbop@ospo.pr");

    expect(sendEmail).toHaveBeenCalled()
   });

   it("Should not  be able to send email to if user does not exists", async() => {
     await expect(
      sendForgotEmilPasswordUseCase.execute('123@123.com')
     ).rejects.toEqual(new AppError('User not Found!'))
   });

   it('shoulb be able to create user Token', async () => {
     const generateToken = spyOn(usersTokensRepositoryInMemory, "create")

     usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "abome@regrog.ee",
      name: "Leon Perkins",
      password: "1234",
     });

     await sendForgotEmilPasswordUseCase.execute("abome@regrog.ee");

     expect(generateToken).toBeCalled()
   })
})
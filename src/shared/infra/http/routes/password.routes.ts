import { ResetPasswordUserController } from "@modules/accounts/UseCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordController } from "@modules/accounts/UseCases/SendForgotPasswordEmail/SendForgotPasswordController";
import { Router } from "express";

const passwordRoutes = Router()


const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordController.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)

export { passwordRoutes }
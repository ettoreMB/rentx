import { SendForgotPasswordController } from "@modules/accounts/UseCases/SendForgotPasswordEmail/SendForgotPasswordController";
import { Router } from "express";

const passwordRoutes = Router()


const sendForgotPasswordController = new SendForgotPasswordController()

passwordRoutes.post("/forgot", sendForgotPasswordController.handle )

export{passwordRoutes}
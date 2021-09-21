import { Router } from "express";

import multer from 'multer';
import uploadConfig from "@config/upload";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

import { CreateUserController } from "@modules/accounts/UseCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/UseCases/UpdateUserAvatar/UpdateUserAvatarUseController";
import { ProfileUserController } from "@modules/accounts/UseCases/ProfileUser/ProfileUserController";


const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController();

const updatadeUserAvatarController = new UpdateUserAvatarController();

const profileUserController = new ProfileUserController()

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/profile", profileUserController.handle)
usersRoutes.patch(
  "/avatar",
  ensureAuthenticate,
  uploadAvatar.single("avatar"), 
  updatadeUserAvatarController.handle
);

export { usersRoutes}
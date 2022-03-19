import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { createUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ensureAuhtenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { updateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController);

usersRoutes.patch("/avatar",
  ensureAuhtenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController);

export { usersRoutes };
import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = Router();

router.post(
  '/users',
  validateRequest(UserValidation.userZodSchema),
  UserController.createUser
);

export const UserRoutes = router;

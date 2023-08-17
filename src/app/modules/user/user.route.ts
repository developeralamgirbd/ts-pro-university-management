import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = Router();

router.post(
  '/students',
  validateRequest(UserValidation.createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent
);
router.post(
  '/faculties',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculty
);

router.post(
  '/admins',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;

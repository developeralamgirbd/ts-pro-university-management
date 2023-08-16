import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = Router();

router.post(
  '/students',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);
router.post(
  '/faculties',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/admins',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;

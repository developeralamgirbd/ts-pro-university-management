import { Router } from 'express';
import { AcademicDepartmentController } from './academicDepartmentcontroller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = Router();

router.post(
  '/academic-departments',
  validateRequest(AcademicDepartmentValidation.createZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createOne
);

router.get('/academic-departments/:id', AcademicDepartmentController.getSingle);

router.get('/academic-departments', AcademicDepartmentController.getAll);
router.patch(
  '/academic-departments/:id',
  validateRequest(AcademicDepartmentValidation.updateZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.updateOne
);

router.delete(
  '/academic-departments/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.removeOne
);

export const DepartmentRoutes = router;

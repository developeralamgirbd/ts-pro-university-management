import { Router } from 'express';
import { AcademicSemesterController } from './academisSemester.controller';
import { AcademicSemisterValidation } from './academicSemeste.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = Router();

router.post(
  '/academicsemesters',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.createAcademicSemester
);

router.get(
  '/academic-semesters/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicSemesterController.getSingleSemester
);

router.get(
  '/academic-semesters',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicSemesterController.getAllAcademicSemesters
);
router.patch(
  '/academic-semesters/:id',
  validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.updateAcademicSemester
);

router.delete(
  '/academic-semesters/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.deleteAcademicSemester
);

export const AcademicRoutes = router;

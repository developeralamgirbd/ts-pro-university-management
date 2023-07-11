import { Router } from 'express';
import { AcademicSemesterController } from './academisSemester.controller';
import { AcademicSemisterValidation } from './academicSemeste.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = Router();

router.post(
  '/academicsemesters',
  validateRequest(AcademicSemisterValidation.academisSemisterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicRoutes = router;

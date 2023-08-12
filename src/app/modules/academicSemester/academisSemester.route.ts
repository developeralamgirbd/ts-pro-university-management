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

router.get(
  '/academic-semesters/:id',
  AcademicSemesterController.getSingleSemester
);

router.get(
  '/academic-semesters',
  AcademicSemesterController.getAllAcademicSemesters
);
router.patch(
  '/academic-semesters/:id',
  AcademicSemesterController.updateAcademicSemester
);

export const AcademicRoutes = router;

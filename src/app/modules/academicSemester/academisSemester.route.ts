import { Router } from 'express';
import { AcademicSemesterController } from './academisSemester.controller';
import { AcademicSemisterValidation } from './academicSemeste.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = Router();

router.post(
  '/academicsemesters',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
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
  validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  AcademicSemesterController.updateAcademicSemester
);

router.delete(
  '/academic-semesters/:id',
  AcademicSemesterController.deleteAcademicSemester
);

export const AcademicRoutes = router;

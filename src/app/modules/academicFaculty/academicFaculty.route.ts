import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = Router();

router.post(
  '/academic-faculties',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get(
  '/academic-faculties/:id',
  AcademicFacultyController.getSingleFaculty
);

router.get(
  '/academic-faculties',
  AcademicFacultyController.getAllAcademicFaculties
);
router.patch(
  '/academic-faculties/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);

router.delete(
  '/academic-faculties/:id',
  AcademicFacultyController.deleteAcademicFaculty
);

export const FacultyRoutes = router;

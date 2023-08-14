import { Router } from 'express';
import { AcademicDepartmentController } from './academicDepartmentcontroller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { validateRequest } from '../../middlewares/validateRequest';
const router = Router();

router.post(
  '/academic-departments',
  validateRequest(AcademicDepartmentValidation.createZodSchema),
  AcademicDepartmentController.createOne
);

router.get('/academic-departments/:id', AcademicDepartmentController.getSingle);

router.get('/academic-departments', AcademicDepartmentController.getAll);
router.patch(
  '/academic-departments/:id',
  validateRequest(AcademicDepartmentValidation.updateZodSchema),
  AcademicDepartmentController.updateOne
);

router.delete(
  '/academic-departments/:id',
  AcademicDepartmentController.removeOne
);

export const DepartmentRoutes = router;

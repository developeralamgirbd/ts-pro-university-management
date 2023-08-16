import express from 'express';
import {validateRequest} from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get(
    '/faculties/:id',
    FacultyController.getSingleFaculty
);

router.get(
    '/faculties',
    FacultyController.getAllFaculties
);

router.patch(
    '/faculties/:id',
    validateRequest(FacultyValidation.updateFacultyZodSchema),
    FacultyController.updateFaculty
);

router.delete(
    '/faculties/:id',
    FacultyController.deleteFaculty
);

export const FacultyRoutes = router;
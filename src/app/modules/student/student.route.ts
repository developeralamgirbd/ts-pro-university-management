import express from 'express';
import {validateRequest} from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidaion } from './student.validation';
const router = express.Router();

router.get(
    '/students/:id',
    StudentController.getSingleStudent
);

router.get(
    '/students',
    StudentController.getAllStudents
);


router.delete(
    '/students/:id',
    StudentController.deleteStudent
);

router.patch(
    '/students/:id',
    validateRequest(StudentValidaion.updateStudentZodSchema),
    StudentController.updateStudent
);


export const StudentRoutes = router;
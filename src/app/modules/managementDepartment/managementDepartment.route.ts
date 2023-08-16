import express from 'express';

import {validateRequest} from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
    '/managements-department',
    validateRequest(
        ManagementDepartmentValidation.createManagementDepartmentZodSchema
    ),
    ManagementDepartmentController.createDepartment
);

router.get(
    '/managements-department/:id',
    ManagementDepartmentController.getSingleDepartment
);

router.patch(
    '/managements-department/:id',
    validateRequest(
        ManagementDepartmentValidation.updateManagementDepartmentZodSchema
    ),
    ManagementDepartmentController.updateDepartment
);

router.delete(
    '/managements-department/:id',
    ManagementDepartmentController.deleteDepartment
);

router.get(
    '/managements-department',
    ManagementDepartmentController.getAllDepartments
);

export const ManagementDepartmentRoutes = router;
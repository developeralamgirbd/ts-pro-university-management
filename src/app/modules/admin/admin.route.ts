import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import {validateRequest} from "../../middlewares/validateRequest";
const router = express.Router();

router.get(
    '/admins/:id',
    AdminController.getSingleAdmin
);
router.get(
    '/admins',
    AdminController.getAllAdmins
);

router.patch(
    '/admins/:id',
    validateRequest(AdminValidation.updateAdmin),
    AdminController.updateAdmin
);

router.delete(
    '/admins/:id',
    AdminController.deleteAdmin
);

export const AdminRoutes = router;
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicRoutes } from '../modules/academicSemester/academisSemester.route';
import { FacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import {ManagementDepartmentRoutes} from "../modules/managementDepartment/managementDepartment.route";
import {AdminRoutes} from "../modules/admin/admin.route";
import {StudentRoutes} from "../modules/student/student.route";
const router = Router();

const moduleRoutes = [
  {
    route: UserRoutes,
  },
  {
    route: AcademicRoutes,
  },
  {
    route: FacultyRoutes,
  },
  {
    route: DepartmentRoutes,
  },
  {
    route: ManagementDepartmentRoutes,
  },
  {
    route: AdminRoutes,
  },
  {
    route: FacultyRoutes,
  },
  {
    route: StudentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.route));

export default router;

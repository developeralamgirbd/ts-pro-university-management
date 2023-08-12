import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicRoutes } from '../modules/academicSemester/academisSemester.route';
import { FacultyRoutes } from '../modules/academicFaculty/academisSemester.route';
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
];

moduleRoutes.forEach(route => router.use(route.route));

export default router;

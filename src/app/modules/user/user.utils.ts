import { IAcademicSemister } from '../academicSemester/academicSemester.interface';
import {
  findLastAdminId,
  findLastFacultyId,
  findLastStudentId,
} from './user.service';

export const generateStudentId = async (
  academicSemester: IAcademicSemister | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  // increement id by 1
  let increementalId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  increementalId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${increementalId}`;

  return increementalId;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  // increement id by 1
  const increementalId =
    'F-' + (parseInt(currentId) + 1).toString().padStart(5, '0');
  return increementalId;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  // increement id by 1
  const increementalId =
    'A-' + (parseInt(currentId) + 1).toString().padStart(5, '0');
  return increementalId;
};

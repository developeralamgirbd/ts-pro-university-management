import { IAcademicSemister } from './academicSemester.interface';
import AcademicSemister from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  const result = await AcademicSemister.create(payload);
  return result;
};

export const AcademicSemesterService = { createSemester };

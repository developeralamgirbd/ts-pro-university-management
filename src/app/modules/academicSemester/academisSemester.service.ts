import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemister } from './academicSemester.interface';
import AcademicSemister from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code!');
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

export const AcademicSemesterService = { createSemester };

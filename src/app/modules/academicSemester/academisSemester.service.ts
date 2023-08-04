import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemister } from './academicSemester.interface';
import AcademicSemister from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';

const createSemester = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code!');
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  // const result = await AcademicSemister.aggregate([
  //   { $match: {} },
  //   { $skip: skip },
  //   { $limit: Number(limit) },
  // ]);

  const result = await AcademicSemister.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = { createSemester, getAllSemesters };

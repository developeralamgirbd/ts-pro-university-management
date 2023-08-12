import { searchableFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface';
import AcademicFacultyModel from './academicFaculty.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllFaculties = async (
  filters: IAcademicFacultyFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { search, ...filtersData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: Record<string, 1 | -1> = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder as 1 | -1;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicFacultyModel.aggregate([
    { $match: whereConditions },
    { $sort: sortCondition }, // Use the sortCondition variable here
    { $skip: skip },
    { $limit: limit },
  ]);

  // const result = await AcademicSemister.find().sort().skip(skip).limit(limit);

  const total = await AcademicFacultyModel.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  return AcademicFacultyModel.findById(id);
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  return AcademicFacultyModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};
const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  return AcademicFacultyModel.findByIdAndDelete({ _id: id });
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};

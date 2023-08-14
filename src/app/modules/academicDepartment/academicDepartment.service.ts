import { searchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface';
import AcademicDepartmentModel from './academicDepartment.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { dbQueries } from './dbQueries';

const createOneService = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartmentModel.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllService = async (
  filters: IAcademicDepartmentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
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

  const result = await AcademicDepartmentModel.aggregate([
    { $match: whereConditions },
    { $lookup: dbQueries.joiningStageOne },
    { $project: dbQueries.projection },
    { $sort: sortCondition }, // Use the sortCondition variable here
    { $skip: skip },
    { $limit: limit },
  ]);

  // const result = await AcademicSemister.find().sort().skip(skip).limit(limit);

  const total = await AcademicDepartmentModel.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  return AcademicDepartmentModel.findById(id).populate('academicFaculty');
};

const updateOneService = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  return AcademicDepartmentModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty');
};
const removeOneService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  return AcademicDepartmentModel.findByIdAndDelete({ _id: id });
};

export const AcademicDepartmentService = {
  createOneService,
  getAllService,
  getSingleService,
  updateOneService,
  removeOneService,
};

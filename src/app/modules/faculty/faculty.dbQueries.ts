const facultyJoiningStageOne = {
  from: 'faculties',
  localField: 'faculty',
  foreignField: '_id',
  as: 'faculty',
};

const academicFacultyJoiningStageOne = {
  from: 'academicfaculties',
  localField: 'faculty.academicFaculty',
  foreignField: '_id',
  as: 'academicFaculty',
};

const departmentJoiningStageOne = {
  from: 'academicdepartments',
  localField: 'faculty.academicDepartment',
  foreignField: '_id',
  as: 'academicDepartment',
};

export const facultyDBQueries = {
  facultyJoiningStageOne,
  departmentJoiningStageOne,
  academicFacultyJoiningStageOne,
};

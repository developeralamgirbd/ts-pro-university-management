const studentJoiningStageOne = {
  from: 'students',
  localField: 'student',
  foreignField: '_id',
  as: 'student',
};

const academicSemesterJoiningStageOne = {
  from: 'academicsemesters',
  localField: 'student.academicSemester',
  foreignField: '_id',
  as: 'academicSemester',
};

const academicFacultyJoiningStageOne = {
  from: 'academicfaculties',
  localField: 'student.academicFaculty',
  foreignField: '_id',
  as: 'academicFaculty',
};

const departmentJoiningStageOne = {
  from: 'academicdepartments',
  localField: 'student.academicDepartment',
  foreignField: '_id',
  as: 'academicDepartment',
};

const projection = {
  _id: 1,
  title: 1,
  createdAt: 1,
  updatedAt: 1,
  id: '$_id',
  academicFaculty: {
    _id: { $first: '$academicFaculty._id' },
    title: { $first: '$academicFaculty.title' },
    createdAt: { $first: '$academicFaculty.createdAt' },
    updatedAt: { $first: '$academicFaculty.updatedAt' },
    id: { $first: '$academicFaculty._id' },
  },
};

// academicFaculty: { $arrayElemAt: ['$academicFaculty', 0] },

export const studentDBQueries = {
  projection,
  studentJoiningStageOne,
  academicSemesterJoiningStageOne,
  departmentJoiningStageOne,
  academicFacultyJoiningStageOne,
};

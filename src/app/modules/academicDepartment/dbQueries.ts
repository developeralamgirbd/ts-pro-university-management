const joiningStageOne = {
  from: 'academicfaculties',
  localField: 'academicFaculty',
  foreignField: '_id',
  as: 'academicFaculty',
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

export const dbQueries = {
  projection,
  joiningStageOne,
};

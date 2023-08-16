const adminJoining = {
  from: 'admins',
  localField: 'admin',
  foreignField: '_id',
  as: 'admin',
};
const managementDepartmentJoining = {
  from: 'managementdepartments',
  localField: 'admin.managementDepartment',
  foreignField: '_id',
  as: 'managementDepartment',
};

export const adminDbQueries = {
  adminJoining,
  managementDepartmentJoining,
};

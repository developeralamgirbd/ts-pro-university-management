import { Schema, model } from 'mongoose';
import {
    IManagementDepartment,
    ManagementDepartmentModel,
} from './managementDepartment.interface';

const ManagementDepartmentSchema = new Schema<
    IManagementDepartment,
    ManagementDepartmentModel
>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        versionKey: false
    }
);

export const ManagementDepartment = model<
    IManagementDepartment,
    ManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema);
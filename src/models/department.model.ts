import { Schema, model, Types } from 'mongoose';
import { IDepartment } from '../interfaces/IDepartment';

const departmentSchema: Schema<IDepartment> = new Schema({
    name: {
        type: String,
        required: true,
    },
    idCompanies: {
        type: Types.ObjectId,
        ref: 'Companies'
    },
},{
    versionKey: false,
    timestamps: false
})

const Department = model<IDepartment>('Department', departmentSchema);
export default Department;
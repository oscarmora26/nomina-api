import { Schema, model, Types } from 'mongoose';
import { IJob } from '../interfaces/IJob';

const jobSchema: Schema<IJob> = new Schema({
    name: {
        type: String,
        required: true,
    },
    idDepartment: {
        type: Types.ObjectId,
        ref: 'Companies'
    },
},{
    versionKey: false,
    timestamps: false
})

const Job = model<IJob>('Job', jobSchema);
export default Job;
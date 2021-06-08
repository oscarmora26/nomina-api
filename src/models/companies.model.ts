import { Schema, model } from 'mongoose';
import { ICompanies } from '../interfaces/ICompanies';

const companiesSchema: Schema<ICompanies> = new Schema({
    name: {
        type: String,
        required: true,
    }
},{
    versionKey: false,
    timestamps: false
})

const Companies = model<ICompanies>('Companies', companiesSchema);
export default Companies;

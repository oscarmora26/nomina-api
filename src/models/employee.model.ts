import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { IEmployee } from '../interfaces/IEmployee'

const employeeSchema: Schema<IEmployee> = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
        minLength: 6,        
    },
    cedula: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['m', 'f']
    },
    admissionDate: {
        type: Date,
        default: Date.now()
    },
    driversLicense: {
        type: String
    },
    phones: {
        homePhone: { type: String },
        cellPhone: { type: String }
    },
    adress: {
        city: { type: String },
        street: { type: String },
        numberHome: { type: String }
    },
    informationBank: {
        Bank: { type: String },
        bankAccountType: { type: String, enum: ['ahorro', 'corriente'] },
        accountNumber: { type: String }
    },
    salary: {
        type: Number,
        required: true,
    },
    hasArs: {
        type: Boolean, 
        required: true
    },
    hasAfp : {
        type: Boolean, 
        required: true
    },
    hasIrs : {
        type: Boolean, 
        required: true
    },
    rol: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular'
    },
    idCompanies: {
        type: Types.ObjectId,
        ref: 'Companies'
    },
    idDepartment: {
        type: Types.ObjectId,
        ref: 'Department'
    },
    idJob: {
        type: Types.ObjectId,
        ref: 'Job'
    },
},{
    versionKey: false,
    timestamps: false
});

employeeSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => next(err))
})

employeeSchema.statics.findByCredentials = async (email: string, password: string) => {

    const _employee = await Employee.findOne({ email});
    
    if(!_employee) throw new Error('Invalid login credentials');

    const isPasswordMatch = await bcrypt.compare(password, _employee.password);

    if(!isPasswordMatch) throw new Error('Invalid login credentials' );

    console.log(_employee)
    return _employee;
}

const Employee = model<IEmployee>('Employee', employeeSchema);
export default Employee;



import { IEmployee } from "../interfaces/IEmployee";
import { BaseRepository } from "./base.repository";
import Employee from '../models/employee.model';
import bcrypt from 'bcrypt';

export class EmployeeRepository extends BaseRepository<IEmployee>{

    constructor() {
        super(Employee)
    }

    async update(id: string, doc: {}) {
        const employee = await Employee.updateOne({ _id: id }, { $set: doc })
        return employee;
    }

    async findByCredentials (email: string, password: string) {
        console.log(email, password)
        const employee = await Employee.findOne({ email});
        
        if(!employee) throw new Error('Invalid login credentials');
    
        const isPasswordMatch = await bcrypt.compare(password, employee.password);
    
        if(!isPasswordMatch) throw new Error('Invalid login credentials' );

        return employee;
    }
    
}
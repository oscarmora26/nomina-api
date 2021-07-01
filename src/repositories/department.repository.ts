
import { BaseRepository } from "./base.repository";
import { IDepartment } from '../interfaces/IDepartment';
import Department from '../models/department.model';

export class DepartmentRepository extends BaseRepository<IDepartment>{

    constructor(){
        super(Department);
    }  
    
    getDepartmentByCompanies = async (idCompanies: string) => {
        const departmentList = await Department.find({idCompanies});        
        return departmentList;
    }
}

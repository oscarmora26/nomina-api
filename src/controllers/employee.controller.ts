import { Request, Response } from 'express';
import { EmployeeRepository } from '../repositories/employee.repository';
import { BaseController } from './base.controller';


export class EmployeeController extends BaseController {

    constructor(){
        super(new EmployeeRepository)
    }

    async update (req: Request, res: Response) {

        try {
            const repo = new EmployeeRepository();

            const _employee = await repo.getOne(req.params.id);
    
            if (!_employee) res.status(404).json({ ok: false, msg: "Employee not found" });
    
            const employeeModify = await repo.update(req.params.id, req.body);
    
            res.status(200).json({ ok: true, data: employeeModify });
    
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}







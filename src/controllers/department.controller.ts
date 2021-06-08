import { DepartmentRepository } from "../repositories/department.repository";
import { BaseController } from "./base.controller";
import { Request, Response } from 'express';
import { report } from "process";

export class DepartmentController extends BaseController {

    repo: DepartmentRepository
    
    constructor() {
        super(new DepartmentRepository());   
        this.repo = <DepartmentRepository>this._repository     
    }

    getDepartmentByCompanies = async(req: Request, res: Response) => {   
        
        try {
            const departmentList = await this.repo.getDepartmentByCompanies(req.params.id)
            
            if (!departmentList) res.status(404).json({ ok: false, msg: "Entity not found" });

            res.status(200).json({ ok: true, data: departmentList });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }


}
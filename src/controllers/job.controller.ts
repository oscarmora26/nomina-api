import { BaseController } from "./base.controller";
import { JobRepository } from "../repositories/job.repository";
import { Request, Response } from 'express';

export class JobController extends BaseController {

    repo: JobRepository;

    constructor(){
        super(new JobRepository());
        this.repo = <JobRepository>this._repository;
    }

    async getJobByDepartment(req: Request, res: Response) {   
        
        try {
            const departmentList = await this.repo.getJobByDepartment(req.params.id)
            
            if (!departmentList) res.status(404).json({ ok: false, msg: "Entity not found" });

            res.status(200).json({ ok: true, data: departmentList });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}
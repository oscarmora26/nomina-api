import { IJob } from "../interfaces/IJob";
import Job from "../models/Job.model";
import { BaseRepository } from "./base.repository";

export class JobRepository extends BaseRepository<IJob>{

    constructor(){
        super(Job);
    }  
    
    async getJobByDepartment (idDepartment: string) {
        const jobList = await Job.find({idDepartment})
        return jobList;
    }
}

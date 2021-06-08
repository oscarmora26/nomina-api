
import { BaseRepository } from "./base.repository";
import { ICompanies } from "../interfaces/ICompanies";
import Companies from '../models/companies.model';
import { CompaniesController } from "../controllers/companies.controller";
// import { Spartan } from "../entities/Spartan"

// now, we have all code implementation from BaseRepository
export class CompaniesRepository extends BaseRepository<ICompanies>{

    // here, we can create all especific stuffs of Spartan Repository
    constructor(){
        super(Companies);
    }  
    
}


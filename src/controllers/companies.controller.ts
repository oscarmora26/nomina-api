import { CompaniesRepository } from "../repositories/companies.repository";
import { BaseController } from "./base.controller";


export class CompaniesController extends BaseController{
    
    constructor() {
        super(new CompaniesRepository());
    }
}
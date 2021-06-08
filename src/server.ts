import express, { Application } from 'express';
import cors from 'cors';
import { PORT } from './config/properties';
import EmployeeRouter from './routes/employee.router';
import CompaniesRouter from './routes/companies.router';
import DepartmentRouter from './routes/department.routes';
import JobRouter from './routes/job.router';
import NominaRouter from './routes/nomina.router';
import AuthRouter from './routes/auth.router';

import AuthMiddleware from './middlewares/auth.middleware'

class Server {

    public app: Application

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(AuthMiddleware);
    }

    routes() {

        this.app.use('/api/v1/employee', EmployeeRouter);
        this.app.use('/api/v1/companies', CompaniesRouter);
        this.app.use('/api/v1/department', DepartmentRouter);
        this.app.use('/api/v1/job', JobRouter);
        this.app.use('/api/v1/nomina', NominaRouter);
        this.app.use('/api/v1/auth', AuthRouter);

    }

    start() {
        this.app.listen(PORT, () => {
            console.log("Server on port: ", PORT);
        })
    }
}

export { Server };

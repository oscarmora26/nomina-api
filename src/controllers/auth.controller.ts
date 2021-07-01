import { Request, Response } from 'express'
import Employee from '../models/employee.model';
import jwt from 'jsonwebtoken';
import { EmployeeRepository } from '../repositories/employee.repository';
import { SECRET_KEY } from '../config/properties';

export class AuthController {

    loginAdmin = async (req: Request, res: Response) => {
    
        try {
            const repo = new EmployeeRepository();

            const { email, password } = req.body;
    
            const _user = await repo.findByCredentials(email, password);            
    
            const token = jwt.sign({ id: _user._id, rol: _user.rol }, SECRET_KEY!)
    
            res.status(200).json({ ok: true, token });
    
        } catch (err) {
            if(err.message == "Invalid login credentials"){
                res.status(401).json({ ok: false, msg: 'Login failed! Check authentication credentials' })
            }
            
            console.log(err);
            res.status(500).json(err)
        }
    }
}

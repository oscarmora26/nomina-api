import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/properties';
import Employee from '../models/employee.model';

const auth = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.path === '/api/v1/auth/loginAdmin') return next();

        if (!req.headers.authorization) res.status(401).json({ ok: false, msg: "Dont have authorization" });

        const token = req.headers.authorization.split(" ")[1];

        const decode = jwt.verify(token, SECRET_KEY) as { id: string, rol: string };

        const employee = await Employee.findOne({ _id: decode.id })

        if (!employee) res.status(403).json({ ok: false, msg: "Dont have authorization" });

        if (req.method === 'GET' && decode.rol === 'regular') return next();

        if (decode.rol === 'admin') return next();

        res.status(401).json({ ok: false, msg: "Dont have authorization" });

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


export default auth;
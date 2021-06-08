import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Employee from '../models/employee.model';
import { BaseRepository } from '../repositories/base.repository';

export abstract class BaseController {

    public _repository: BaseRepository<Document>

    constructor(repository: BaseRepository<Document>) {
        this._repository = repository;
    }

    getAll = async (req: Request, res: Response) => {
        
        try {
            const entityList = await this._repository.getAll();

            res.status(200).json({ ok: true, data: entityList });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    getOne = async (req: Request, res: Response) => {

        try {
            const entity = await this._repository.getOne(req.params.id);

            if (!entity) res.status(404).json({ ok: false, msg: "Entity not found" });

            res.status(200).json({ ok: true, data: entity });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    create = async (req: Request, res: Response) => {

        try {
            const entity = await this._repository.create(req.body);

            console.log("New Entity ", entity);

            res.status(201).json({ ok: true, data: entity });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}



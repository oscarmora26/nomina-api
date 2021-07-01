import { Request, Response } from 'express';
import { NominaRepository } from '../repositories/nomina.repository';

export class NominaController {

    repo: NominaRepository;

    constructor(){
        this.repo = new NominaRepository();
    }

    getAll = async (req: Request, res: Response) => {

        try {
            
            const nominaList = await this.repo.getAll();

            res.status(200).json({ ok: true, data: nominaList });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    getOne = async (req: Request, res: Response) => {

        try {
            const nomina = await this.repo.getOne(req.params.id);

            if (!nomina) res.status(404).json({ ok: false, msg: "Entity not found" });

            res.status(200).json({ ok: true, data: nomina });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    getByCompanies = async (req:Request, res: Response) => {

        try {
            const nominaList = await this.repo.getByCompanies(req.params.idCompanies);

            if (!nominaList) res.status(404).json({ ok: false, msg: "Entity not found" });

            res.status(200).json({ ok: true, data: nominaList });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    generateNomina = async (req: Request, res: Response) => {

        try {
            const nominaList = await this.repo.generateNomina(req.params.idCompanies);

            if (nominaList)
                res.status(200).json({ ok: true});
            else
                res.status(403).json({ ok: false, msg: "Ya se ha generado esta nomina" });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    update = async (req: Request, res: Response) => {

        try {
            const nomina = await this.repo.update(req.params.id, req.body);
            res.status(200).json({ ok: true, data: nomina });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}
import { Request, Response } from 'express';
import { NominaRepository } from '../repositories/nomina.repository';

export class NominaController {

    async getAll (req: Request, res: Response) {

        try {
            const repo = new NominaRepository();

            const nominaList = await repo.getAll();

            res.status(200).json({ ok: true, data: nominaList });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    async getOne (req: Request, res: Response) {

        try {
            const repo = new NominaRepository();

            const nomina = await repo.getOne(req.params.id);

            if (!nomina) res.status(404).json({ ok: false, msg: "Entity not found" });

            res.status(200).json({ ok: true, data: nomina });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    async getByCompanies (req:Request, res: Response) {

        try {
            const repo = new NominaRepository();

            const nominaList = await repo.getByCompanies(req.params.idCompanies);

            if (!nominaList) res.status(404).json({ ok: false, msg: "Entity not found" });

            res.status(200).json({ ok: true, data: nominaList });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    async generateNomina (req: Request, res: Response) {

        try {
            const repo = new NominaRepository();

            const nominaList = await repo.generateNomina(req.params.idCompanies);

            if (nominaList)
                res.status(200).json({ ok: true});
            else
                res.status(403).json({ ok: false, msg: "Ya se ha generado esta nomina" });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    async update (req: Request, res: Response) {

        try {
            const repo = new NominaRepository();

            const nomina = await repo.update(req.params.id, req.body);
            res.status(200).json({ ok: true, data: nomina });

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}
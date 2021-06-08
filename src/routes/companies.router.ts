import { Router } from 'express';
import { CompaniesController } from '../controllers/companies.controller';

const router = Router();

const companiesController = new CompaniesController();

router.get('/', companiesController.getAll);
router.get('/:id', companiesController.getOne)
router.post('/', companiesController.create);


export default router;
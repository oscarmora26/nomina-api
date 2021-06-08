import { Router } from 'express';
import { NominaController } from '../controllers/nomina.controller';
import Nomina from '../models/nomina.model';
 

const router = Router();

const nominaController = new NominaController();

router.post('/generateNomina/:idCompanies', nominaController.generateNomina);
router.get('/companies/:idCompanies', nominaController.getByCompanies);
router.get('/', nominaController.getAll);
router.get('/:id', nominaController.getOne);
router.patch('/:id', nominaController.update);


export default router;
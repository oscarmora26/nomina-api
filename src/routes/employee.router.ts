import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';


const router = Router();

const emploteController = new EmployeeController();

router.get('/', emploteController.getAll);
router.get('/:id', emploteController.getOne)
router.post('/', emploteController.create);
router.patch('/:id', emploteController.update)


export default router;
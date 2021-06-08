import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';

const router = Router();

const departmentController = new DepartmentController();

router.get('/', departmentController.getAll);
router.get('/:id', departmentController.getOne)
router.post('/', departmentController.create);
router.get('/companies/:id', departmentController.getDepartmentByCompanies)

export default router;
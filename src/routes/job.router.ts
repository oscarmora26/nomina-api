import { Router } from 'express';
import { JobController } from '../controllers/job.controller';

const router = Router();

const jobController = new JobController();

router.get('/', jobController.getAll);
router.get('/:id', jobController.getOne)
router.post('/', jobController.create);
router.get('/department/:id', jobController.getJobByDepartment);


export default router;
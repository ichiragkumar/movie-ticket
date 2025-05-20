import { Router } from 'express';
import { createTask } from '../controller/task.controller';
import { executeTask } from '../controller/execute.controller';


const router = Router();

router.post('/create-task', createTask);
router.post('/execute-task', executeTask);

export default router;

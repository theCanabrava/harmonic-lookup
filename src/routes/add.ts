import express from 'express';
import Path from './Path';
import { addHarmony } from '../controllers/addControler';

const router = express.Router();

router.post(Path.ADD_HARMONY_PATH, addHarmony);

export default router;
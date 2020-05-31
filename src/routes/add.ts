import express from 'express';
import Path from './Path';
import { addHarmony, addRythm } from '../controllers/addControler';

const router = express.Router();

router.post(Path.ADD_HARMONY_PATH, addHarmony);
router.post(Path.ADD_RYTHM_PATH, addRythm);

export default router;
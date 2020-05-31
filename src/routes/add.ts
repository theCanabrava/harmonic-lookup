import express from 'express';
import Path from './Path';
import { addHarmony, addRythm, addMelody } from '../controllers/addControler';

const router = express.Router();

router.post(Path.ADD_HARMONY_PATH, addHarmony);
router.post(Path.ADD_RYTHM_PATH, addRythm);
router.post(Path.ADD_MELODY_PATH, addMelody);

export default router;
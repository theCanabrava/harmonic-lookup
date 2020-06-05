import express from 'express';
import Path from './Path';
import { addName, upvoteName, downvoteName } from '../controllers/nameControler';

const router = express.Router();

router.post(Path.ADD_NAME_PATH, addName);
router.post(Path.UPVOTE_NAME_PATH, upvoteName);
router.post(Path.DOWNVOTE_NAME_PATH, downvoteName);

export default router;
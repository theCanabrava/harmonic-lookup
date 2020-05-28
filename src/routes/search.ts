import express from 'express';
import Path from './Path';
import { search } from '../controllers/searchController';

const router = express.Router();

router.get(Path.SEARCH_PATH, search);

export default router;
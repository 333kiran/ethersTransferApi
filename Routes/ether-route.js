import express from 'express';
import {transfer} from '../Controlers/ethers.js';

const router = express.Router();

router.post('/token-transfer',transfer);

export default router;
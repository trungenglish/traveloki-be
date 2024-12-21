import express from 'express';
export const router = express.Router();

import { routerV1 } from './v1';

router.use('/api', routerV1)




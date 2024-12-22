import express from 'express';
export const router = express.Router();

import { routerV1 } from './v1';

const BASE_REST_API: string = '/api';

router.use(BASE_REST_API, routerV1)




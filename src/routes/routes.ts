import express from 'express';
import productsRoute from './productsRoute.js';
export const router = express.Router();
const baseRoute = '/api';
router.use(baseRoute + '/products', productsRoute);


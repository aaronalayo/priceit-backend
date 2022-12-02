import express from 'express';
import { findRoute } from './findRoute.js';
import { defaultRoute } from './defaultRoute.js';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(findRoute);
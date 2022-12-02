import express, { Request, Response } from 'express';
import { routesNames } from './routesNames.js';
import { getServicesData } from '../controllers/getServicesData.js'

export const findRoute = express.Router();
findRoute.get(routesNames.find, getServicesData)







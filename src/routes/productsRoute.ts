import Router from 'express';
import { getEbayServiceData, getFacebookServiceData, getGoogleServiceData } from '../controllers/serviceData.controller.js';
const productsRouter = Router();

// productsRouter.get('/find', getServicesData);
productsRouter.get('/find/ebay', getEbayServiceData);
productsRouter.get('/find/facebook', getFacebookServiceData);
productsRouter.get('/find/google', getGoogleServiceData);
export default productsRouter;

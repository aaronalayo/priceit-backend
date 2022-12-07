import Router from 'express';
import { getServicesData } from '../controllers/serviceData.controller.js'
const productsRouter = Router()

productsRouter.get("/find", getServicesData)




export default productsRouter;


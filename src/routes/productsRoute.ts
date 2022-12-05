import Router from 'express';
import { getServicesData } from '../controllers/getServicesData.js'
const productsRouter = Router()

productsRouter.get("/find", getServicesData)




export default productsRouter;


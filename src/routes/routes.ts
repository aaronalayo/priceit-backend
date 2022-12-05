import express from 'express';
import  productsRoute  from './productsRoute.js';
import userRoutes from '../routes/UserRoute.js'
export const router = express.Router();
const baseRoute:string = "/api"
router.use(baseRoute + "/products", productsRoute);
//User routes (Allows CRUD on users)
router.use(baseRoute+ "/users", userRoutes)
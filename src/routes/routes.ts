import Router from 'express'
import productsRoute  from './productsRoute.js';
import userRoutes from './userRoutes.js'

const router = Router()

const baseRoute:string = "/api"

router.use(baseRoute + "/products", productsRoute);
//User routes (Allows CRUD on users)
router.use(baseRoute+ "/users", userRoutes)

export default router;
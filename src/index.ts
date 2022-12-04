import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import { getFacebookData } from './api/getFacebookData.js'
import { getEbayData } from './api/getEbayData.js'
import { serialize } from "v8";
import { getGData } from './api/googleShop.js'
import { config } from './config/config.js'
import mongoose  from './connectors/db.connect.js';
import userRoutes from './routes/UserRoute.js'
dotenv.config();
// mongo db connect
mongoose
const allowedOrigins = ['http://localhost:5173'];
const router:Express = express();
// router.use(cors); /* NEW */
router.use(express.json())

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
router.use(cors(options));

router.get('/', (req: Request, res: Response) => {
});

//User routes (Allows CRUD on users)
router.use('/users', userRoutes)

router.get('/api/find', async (req:Request, res: Response) => {
  let searchWord:string = req.query.search as string;
  let page:number = Number(req.query.page as string)
  // getGData(searchWord).then(data => {
  //   res.json(data)
  // })  
  getFacebookData(searchWord, page).then(data => {
    res.json(data)
})
//   getEbayData(searchWord).then(data => {
//     res.json(data)
//  })
  
})

router.listen(config.server.port, () => { 
  console.log(`⚡️[server]: Server is running at http://localhost:${config.server.port}`);
});

// router.on('uncaughtException', (e)=> {
//   process.exit()
// })

// process.on('SIGTERM', (e)=> {
//   process.exit()
// })
// process.on('exit', (e)=> {
//   process.exit()
// })
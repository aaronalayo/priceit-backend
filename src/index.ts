import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import { getFacebookData } from './api/getFacebookData.js'
import { getEbayData } from './api/getEbayData.js'
import { serialize } from "v8";
import { getGData } from './api/googleShop.js'

dotenv.config();

const app:Express = express();
// app.use(cors); /* NEW */


const allowedOrigins = ['http://localhost:5173'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
const port = process.env.PORT;
app.use(cors(options));

app.use(express.json());
  
app.get('/', (req: Request, res: Response) => {
});

app.get('/test', (req: Request, res: Response) => {
  getGData('mouse').then(data => {
    res.json(data)
  })  
})


app.get('/api/find', async (req:Request, res: Response) => {
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

app.listen(port, () => { 
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// app.on('uncaughtException', (e)=> {
//   process.exit()
// })

// process.on('SIGTERM', (e)=> {
//   process.exit()
// })
// process.on('exit', (e)=> {
//   process.exit()
// })
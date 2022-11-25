import express from "express";
import * as dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import { getData } from './api/facebook.js'

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

  
app.get('/', (req: Request, res: Response) => {
  getData('nike shoes').then(data => {
    res.json(data);
  })
  
});
app.post('/search', (req:Request, res: Response) => {

})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
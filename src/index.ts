import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import {router} from './routes/routes.js';

dotenv.config();

const app: Express = express();
// app.use(cors); /* NEW */


import { config } from './config/config.js'
import mongoose  from './connectors/db.connect.js';

dotenv.config();
// mongo db connect
mongoose
const allowedOrigins = ['http://localhost:5173'];


app.use(express.json())

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.use(router);
app.listen(config.server.port, () => { 
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

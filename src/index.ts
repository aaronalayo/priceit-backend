import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import { router } from './routes/routes.js';
const app: Express = express();
// app.use(cors); /* NEW */
dotenv.config();
app.use(express.json());


import { config } from './config/config.js';
import mongoose from './connectors/db.connect.js';

// const allowedOrigins = ['http://127.0.0.1:5173/'];
// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
// };
// app.use(cors(options));

//Fixes CORS issues with ReactJS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); //
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(router);
app.listen(config.server.local_port, () => {
  console.log(`⚡️[SEARCH_API]: Server is running at http://localhost:${config.server.local_port} | Docker PORT: ${config.server.docker_port}`);
  mongoose;
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

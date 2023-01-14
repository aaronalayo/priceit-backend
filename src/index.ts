import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Express, Request, Response } from 'express';
import { router } from './routes/routes.js';
import { config } from './config/config.js';
dotenv.config();

const app: Express = express();
// app.use(cors); /* NEW */

app.use(cors({origin: ["http://localhost:5173", "https://priceit.herokuapp.com"]}));

app.use(express.json());

app.use(router);
app.listen(config.server.local_port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.server.local_port} | Docker PORT: ${config.server.docker_port}`);
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

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Express} from 'express';
import { router } from './routes/routes.js';
import { config } from './config/config.js';
dotenv.config();

const app: Express = express();
// app.use(cors); /* NEW */

app.use(cors({origin: ["http://localhost:5173", "https://priceit.herokuapp.com", "https://priceit.zamanien.com", "http://75.119.139.228:8080"]}));

app.use(express.json());

app.use(router);
app.listen(config.server.local_port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.server.local_port} | Docker PORT: ${config.server.docker_port}`);
});


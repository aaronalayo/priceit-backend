import * as redis from 'redis';
import dotenv from 'dotenv';
import { config } from '../config/config.js';
dotenv.config();

const redisClient = redis.createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port
  },
  password: config.redis.password
});

(async () => {
  redisClient.on('error', (err: any) => {
    console.log('Redis Client Error', err);
  });
  redisClient.on('ready', () => console.log('Redis is ready'));

  await redisClient.connect();

  await redisClient.ping();
})();

export default redisClient
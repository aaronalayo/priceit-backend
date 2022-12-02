import redis from "redis";
import dotenv from 'dotenv'
dotenv.config()
export const redisClient = redis.createClient({
        url: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
      });

(async () => {
  redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
  });
  redisClient.on('ready', () => console.log('Redis is ready'));

  await redisClient.connect();

  await redisClient.ping();
})();
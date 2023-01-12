import dotenv from 'dotenv';
dotenv.config();

const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME as string;
const MONGO_USERNAME = process.env.MONGO_USERNAME as string;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
const MONGO_HOST = process.env.MONGO_HOST as string;
const MONGO_PORT = process.env.MONGO_PORT as unknown as number;
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}` as string;

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT as unknown as number;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;
const REDIS_URL = process.env.REDIS_URL as string;


const PORT = process.env.PORT as unknown as number || 8080;
// const DOCKER_SERVER_PORT = process.env.DOCKER_SERVER_PORT ? Number(process.env.DOCKER_SERVER_PORT) : 8083;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    local_port: PORT,
    docker_port: DOCKER_SERVER_PORT
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    url: REDIS_URL
  }
  // docker_server: {
  //   docker_port: DOCKER_SERVER_PORT
  // }
};

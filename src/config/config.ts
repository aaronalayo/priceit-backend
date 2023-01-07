import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOST = process.env.MONGO_HOST || '';
const MONGO_PORT = process.env.MONGO_PORT || '';
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const REDIS_HOST = process.env.REDIS_HOST as string;
const REDIS_PORT = process.env.REDIS_PORT as unknown as number;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD as unknown as string;

const SERVER_PORT = process.env.LOCAL_SERVER_PORT ? Number(process.env.LOCAL_SERVER_PORT) : 8080;
const DOCKER_SERVER_PORT = process.env.DOCKER_SERVER_PORT ? Number(process.env.DOCKER_SERVER_PORT) : 8083;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    local_port: SERVER_PORT,
    docker_port: DOCKER_SERVER_PORT,
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  }
  // docker_server: {
  //   docker_port: DOCKER_SERVER_PORT
  // }
};

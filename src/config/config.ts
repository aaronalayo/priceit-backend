import dotenv from 'dotenv';
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST as string;
const REDIS_PORT = process.env.REDIS_PORT as unknown as number;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;

const DOCKER_SERVER_PORT = process.env.DOCKER_SERVER_PORT as unknown as number || 8090;
const PORT = process.env.PORT as unknown as number || 8080;

export const config = {
  server: {
    local_port: PORT,
    docker_port: DOCKER_SERVER_PORT
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
  }
};

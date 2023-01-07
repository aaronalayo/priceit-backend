import  redisClient from '../connectors/redis.js';
import { Item } from '../types/item.js';

export const getRedisData = async (key: string) => {
  let serviceData: { itemList?: Item[]; offset?: number } = {};
  const data: any = await redisClient.get(key);
  if (data) {
    serviceData = JSON.parse(data);
    return serviceData;
  } else {
    return null;
  }
};

import { redisClient } from '../connectors/redis.js';
import { ItemEbay } from '../types/itemEbay.js';

const getFacebookRedisData = async (key: string) => {
    let facebookData: {} = {};
    const data: any = await redisClient.get(key);
    if (data) {
      facebookData = JSON.parse(data);
      return facebookData;
    } else {
      return null
    }
  };
  const getEbayRedisData = async (key: string) => {
    let ebayData: {itemList: ItemEbay[], offset:number};
    const data: any = await redisClient.get(key);
    if (data) {
      ebayData = JSON.parse(data);
      return ebayData
    } else {
      return null
    }
  };
  export {getEbayRedisData, getFacebookRedisData}
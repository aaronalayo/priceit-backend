import { redisClient } from '../connectors/redis.js';
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

// const getFacebookRedisData = async (key: string) => {
//     let facebookData: {} = {};
//     const data: any = await redisClient.get(key);
//     if (data) {
//       facebookData = JSON.parse(data);
//       return facebookData;
//     } else {
//       return null
//     }
//   };
//   const getEbayRedisData = async (key: string) => {
//     let ebayData: {itemList: ItemEbay[], offset:number};
//     const data: any = await redisClient.get(key);
//     if (data) {
//       ebayData = JSON.parse(data);
//       return ebayData
//     } else {
//       return null
//     }
//   };
//   const getGoogleRedisData = async (key: string) => {
//     let googleData: {} = {};
//     const data: any = await redisClient.get(key);
//     if (data) {
//       googleData = JSON.parse(data);
//       return googleData;
//     } else {
//       return null
//     }
//   };

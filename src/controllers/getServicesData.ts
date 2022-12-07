import { Request, Response, NextFunction } from 'express';
import { getFacebookData } from '../services/facebookService.js';
import { getEbayData } from '../services/ebayService.js';
import { redisClient } from '../connectors/redis.js';
import { getFacebookRedisData, getEbayRedisData } from '../utils/getRedisData.js'
import { ItemEbay } from '../types/itemEbay.js';

export const getServicesData = async (req: Request, res: Response) => {
  let searchWord: string = (req.query.search as string).toLowerCase();
  let limit: number = parseInt(req.query.limit as string);
  let offset: number = parseInt(req.query.offset as string);

  const key = searchWord;
  const ebayKey = searchWord+`_ebay_${offset}`
  const facebookKey = searchWord+"_facebook"
  const facebookData: {} | null = await getFacebookRedisData(facebookKey);
  const ebayData:{itemList:ItemEbay[], offset:number} | null = await getEbayRedisData(ebayKey);
  
  if (facebookData !== null && ebayData !== null) {
    console.log('Cache hit for', key);
    res.json({ facebookData: facebookData, ebayData: ebayData.itemList, offset:ebayData.offset});
  } else {
    const facebookData = await getFacebookData(searchWord);
    const { response, ebayData } = await getEbayData(searchWord, limit, offset);
    redisClient.setEx(facebookKey, 300, JSON.stringify(facebookData));
    redisClient.setEx(ebayKey, 300, JSON.stringify(ebayData));
    console.log('Cache miss for', key);

    // redisClient.setEx(key + 'ebay', 300, JSON.stringify(ebayData?.itemList));
    return res.status(200).json({ facebookData: facebookData, ebayData: ebayData?.itemList, offset: ebayData?.offset });

    // if (response?.status == 200) {
    //   if (ebayData) {
    //     // return res.status(200).json({facebookData: facebookData, ebayData: ebayData.itemList, offset: ebayData.offset});
    //     return res.status(200).json({ ebayData: ebayData.itemList, facebookData: facebookData, offset: ebayData.offset });
    //   } else {
    //     res.status(400).send('You are not lucky today!');
    //   }
    // }
  }
};

import { Request, Response, NextFunction } from 'express';
import { getFacebookData } from '../services/facebookService.js';
import { getEbayData } from '../services/ebayService.js';
import { getGoogleData } from '../services/googleShopService.js';
import { redisClient } from '../connectors/redis.js';
import { getRedisData } from '../utils/getRedisData.js';
import { Item } from '../types/item.js';

export const getServicesData = async (req: Request, res: Response) => {
  const searchWord: string = (req.query.search as string).toLowerCase();
  const limit: number = parseInt(req.query.limit as string);
  const offset: number = parseInt(req.query.offset as string);
  const start: string = offset.toString();

  const key = searchWord;
  const ebayKey = searchWord + `_ebay_${offset}`;
  const facebookKey = searchWord + '_facebook';
  const googleKey = searchWord + `_google_${offset}`;

  const facebookData: { itemList?: Item[] } | null = await getRedisData(facebookKey);
  const ebayData: { itemList?: Item[]; offset?: number } | null = await getRedisData(ebayKey);
  const googleData: { itemList?: Item[] } | null = await getRedisData(googleKey);

  if (facebookData !== null && ebayData !== null && googleData !== null) {
    console.log('Cache hit for', key);
    res.json({ facebookData: facebookData, ebayData: ebayData.itemList, googleData: googleData, offset: ebayData.offset });
  } else {
    const facebookData = await getFacebookData(searchWord);
    const { response, ebayData } = await getEbayData(searchWord, limit, offset);
    console.log('before googgle', searchWord);
    const googleData = await getGoogleData(searchWord, start);

    redisClient.setEx(facebookKey, 50000, JSON.stringify(facebookData));
    redisClient.setEx(ebayKey, 50000, JSON.stringify(ebayData));
    redisClient.setEx(googleKey, 50000, JSON.stringify(googleData));

    console.log('Cache miss for', key);

    // redisClient.setEx(key + 'ebay', 300, JSON.stringify(ebayData?.itemList));
    return res
      .status(200)
      .json({ facebookData: facebookData, ebayData: ebayData?.itemList, googleData: googleData, offset: ebayData?.offset });

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

import e, { Request, Response, NextFunction } from 'express';
import { getFacebookData } from '../services/facebookService.js';
import { getEbayData } from '../services/ebayService.js';
import { getGoogleData } from '../services/googleShopService.js';
import { redisClient } from '../connectors/redis.js';
import { getRedisData } from '../utils/getRedisData.js';
import { Item } from '../types/item.js';
import { compareData } from '../utils/compareData.js';
import Joi from 'joi';

export const getServicesData = async (req: Request, res: Response) => {
  const searchWord: string = (req.query.search as string).toLowerCase();
  const limit: number = parseInt(req.query.limit as string);
  const offset: number = parseInt(req.query.offset as string);

  const start: number = offset;
  const searchWordSchema = Joi.string().min(3).max(30).required();
  const { error } = searchWordSchema.validate(searchWord);
  if (error) {
    console.log(error);
    return res.status(401).json({ error: error.details[0].message });
  } else if (!error) {
    const key = searchWord;
    const ebayKey = searchWord + `_ebay_${offset}`;
    const facebookKey = searchWord + `_facebook_${offset}`;
    const googleKey = searchWord + `_google_${offset}`;

    let facebookRedisData: { itemList?: Item[] } | null = await getRedisData(facebookKey);
    const ebayRedisData: { itemList?: Item[]; offset?: number } | null = await getRedisData(ebayKey);
    const googleRedisData: { itemList?: Item[] } | null = await getRedisData(googleKey);

    let facebookData: { itemList?: Item[] } | null;
    let ebayData: { itemList?: Item[]; offset?: number } | null;
    let googleData: { itemList?: Item[] } | null;

  

    if (facebookRedisData !== null ) {
      facebookData = facebookRedisData;
      console.log('Cache hit for', facebookKey);
    } else {
      facebookData = await getFacebookData(searchWord);
      redisClient.setEx(facebookKey, 50000, JSON.stringify(facebookData));
      console.log('Cache miss for', facebookKey);
    }
    if (ebayRedisData !== null) {
      ebayData = ebayRedisData;
      console.log('Cache hit for', ebayKey);
    } else {
      ebayData = await getEbayData(searchWord, limit, offset);
      redisClient.setEx(ebayKey, 50000, JSON.stringify(ebayData));
      console.log('Cache miss for', ebayKey);
    }
    // if (googleRedisData !== null) {
    //   googleData = googleRedisData
    //   console.log('Cache hit for', googleKey);
    // } else {
    //   googleData = await getGoogleData(searchWord, start);
    //   redisClient.setEx(googleKey, 50000, JSON.stringify(googleData));
    //   console.log('Cache miss for', googleKey);
    // }
    return res.status(200).json({
      facebookData: facebookData?.itemList,
      ebayData: ebayData?.itemList,
      // googleData: googleData?.itemList,
      offset: ebayData?.offset,
    });
  }
};


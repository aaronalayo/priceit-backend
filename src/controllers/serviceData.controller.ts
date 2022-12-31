import { Request, Response } from 'express';
import { getFacebookData } from '../services/facebookService.js';
import { getEbayData } from '../services/ebayService.js';
// import { getGoogleData } from '../services/googleShopService.js';
import { redisClient } from '../connectors/redis.js';
import { getRedisData } from '../utils/getRedisData.js';
import { Item } from '../types/item.js';
// import { compareData } from '../utils/compareData.js';
import Joi from 'joi';

export const getServicesData = async (req: Request, res: Response) => {
  const searchWord: string = (req.query.search as string).toLowerCase();
  const limit: number = parseInt(req.query.limit as string);
  const offset: number = parseInt(req.query.offset as string);

  // const start : number = offset;
  const searchWordSchema = Joi.string().min(3).max(30).required();
  const { error } = searchWordSchema.validate(searchWord);
  if (error) {
    console.log(error);
    return res.status(401).json({ error: error.details[0].message });
  } else if (!error) {
    const ebayKey = searchWord + `_ebay_${offset}`;
    const facebookKey = searchWord + `_facebook_${offset}`;
    const googleKey = searchWord + `_google_${offset}`;

    const facebookRedisData: { itemList?: Item[] } | null = await getRedisData(facebookKey);
    const ebayRedisData: { itemList?: Item[]; offset?: number } | null = await getRedisData(ebayKey);
    // const googleRedisData: { itemList?: Item[] } | null = await getRedisData(googleKey);

    let facebookData: { itemList?: Item[] } | null;
    let ebayData: { itemList?: Item[]; offset?: number } | null;
    // let googleData: { itemList?: Item[] } | null;
    let response: string;
    if (facebookRedisData !== null) {
      facebookData = facebookRedisData;
      console.log('Cache stored for', facebookKey);
    } else {
      facebookData = await getFacebookData(searchWord);
      if (facebookData) {
        redisClient.set(facebookKey, JSON.stringify(facebookData), {
          EX: 10 * 60,
        });
        console.log('Cache stored for', facebookKey);
      } else {
        response = 'There was a problem with Facebook server';
      }
    }
    if (ebayRedisData !== null) {
      ebayData = ebayRedisData;
      console.log('Cache hit for', ebayKey);
    } else {
      ebayData = await getEbayData(searchWord, limit, offset);
      if (ebayData) {
        redisClient.set(ebayKey, JSON.stringify(ebayData), {
          EX: 10 * 60,
        });
        console.log('Cache stored for', ebayKey);
      } else {
        response = 'There was a problem with Facebook server';
      }
    }
    // if (googleRedisData !== null) {
    //   googleData = googleRedisData
    //   console.log('Cache hit for', googleKey);
    // } else {
    //   googleData = await getGoogleData(searchWord, start);
    //   redisClient.set(googleKey,JSON.stringify(googleData),{
    //    EX: 10 * 60,
    // });
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

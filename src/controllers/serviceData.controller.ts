import { Request, Response } from 'express';
import { getFacebookData } from '../services/facebookService.js';
import { getEbayData } from '../services/ebayService.js';
import { getGoogleData } from '../services/googleShopService.js';
import { redisClient } from '../connectors/redis.js';
import { getRedisData } from '../utils/getRedisData.js';
import { Item } from '../types/item.js';
// import { compareData } from '../utils/compareData.js';
import Joi from 'joi';

// export const getServicesData = async (req: Request, res: Response) => {
//   console.log(req.query);
//   const searchWord: string = (req.query.search as string).toLowerCase();
//   const limit: number = parseInt(req.query.limit as string);
//   const offset: number = parseInt(req.query.offset as string);

//   const start: number = offset;
//   const searchWordSchema = Joi.string().min(3).max(30).required();
//   const { error } = searchWordSchema.validate(searchWord);
//   if (error) {
//     console.log(error);
//     return res.status(401).json({ error: error.details[0].message });
//   } else if (!error) {
//     const ebayKey = searchWord + `_ebay_${offset}`;
//     const facebookKey = searchWord + `_facebook_${offset}`;
//     const googleKey = searchWord + `_google_${offset}`;

//     const facebookRedisData: { itemList?: Item[] } | null = await getRedisData(facebookKey);
//     const ebayRedisData: { itemList?: Item[]; offset?: number } | null = await getRedisData(ebayKey);
//     const googleRedisData: { itemList?: Item[] } | null = await getRedisData(googleKey);

//     let facebookData: { itemList?: Item[] } | null;
//     let ebayData: { itemList?: Item[]; offset?: number; error?: string } | null;
//     let googleData: { itemList?: Item[] } | null;

//     if (facebookRedisData !== null) {
//       facebookData = facebookRedisData;
//       console.log('Cache stored for', facebookKey);
//     } else {
//       facebookData = await getFacebookData(searchWord);
//       if (facebookData) {
//         redisClient.set(facebookKey, JSON.stringify(facebookData), {
//           EX: 5 * 60,
//         });
//         console.log('Cache stored for', facebookKey);
//       }
//     }
//     if (ebayRedisData !== null) {
//       ebayData = ebayRedisData;
//       console.log('Cache hit for', ebayKey);
//     } else {
//       ebayData = await getEbayData(searchWord, limit, offset);
//       if (!ebayData?.error) {
//         redisClient.set(ebayKey, JSON.stringify(ebayData), {
//           EX: 5 * 60,
//         });
//         console.log('Cache stored for', ebayKey);
//       }
//     }
//     // if (googleRedisData !== null) {
//     //   googleData = googleRedisData
//     //   console.log('Cache hit for', googleKey);
//     // } else {
//     //  googleData = await getGoogleData(searchWord, start);
//     //   redisClient.set(googleKey,JSON.stringify(googleData),{
//     //    EX: 5 * 60,
//     // });
//     //   console.log('Cache miss for', googleKey);
//     // }
//     if (ebayData?.error) {
//       console.log(ebayData?.error)
//       res.status(404).json({
//         ebayData: ebayData.error,
//       });
//     }
//     // res.status(200).json({
//     //   facebookData: facebookData?.itemList,
//     //   ebayData: ebayData?.itemList,
//     //   // googleData: googleData?.itemList,
//     //   offset: ebayData?.offset,
//     // });
//   }
// };

export const getEbayServiceData = async (req: Request, res: Response) => {
  const searchWord: string = (req.query.search as string).toLowerCase();
  const limit: number = parseInt(req.query.limit as string);
  const offset: number = parseInt(req.query.offset as string);
  const searchWordSchema = Joi.string().min(3).max(30).required();
  const { error } = searchWordSchema.validate(searchWord);
  if (error) {
    console.log(error);
    return res.status(401).json({ error: error.details[0].message });
  } else if (!error) {
    // const facebookKey = searchWord + `_facebook_${offset}`;
    // const facebookRedisData: { itemList?: Item[] } | null = await getRedisData(facebookKey);
    // let facebookData: { itemList?: Item[], error?: string } | null;


    const ebayKey = searchWord + `_ebay_${offset}`;
    const ebayRedisData: { itemList?: Item[]; offset?: number } | null = await getRedisData(ebayKey);
    let ebayData: { itemList?: Item[]; offset?: number; error?: string } | null;

    
    if (ebayRedisData !== null) {
      ebayData = ebayRedisData
      console.log('Cache hit for', ebayKey);
      return res.status(200).json({ ebayData: ebayData });
    } else {
      ebayData = await getEbayData(searchWord, limit, offset);
      if (ebayData?.error) {
        return res.status(404).json({ error: ebayData.error as string });
      } else {
        redisClient.set(ebayKey, JSON.stringify(ebayData), {
          EX: 5 * 60,
        });
        console.log('Cache stored for', ebayKey);
        return res.status(200).json({ ebayData: ebayData, offset: ebayData?.offset });
      }
    }
  }
};
export const getFacebookServiceData = async (req: Request, res: Response) => {
  const searchWord: string = (req.query.search as string).toLowerCase();
  const offset: number = parseInt(req.query.offset as string);

  const searchWordSchema = Joi.string().min(3).max(30).required();
  const { error } = searchWordSchema.validate(searchWord);
  if (error) {
    console.log(error);
    return res.status(401).json({ error: error.details[0].message });
  } else if (!error) {
    const facebookKey = searchWord + `_facebook_${offset}`;
    const facebookRedisData: { itemList?: Item[] } | null = await getRedisData(facebookKey);
    let facebookData: any;

    
    if (facebookRedisData !== null) {
      facebookData = facebookRedisData
      console.log('Cache hit for', facebookKey);
      return res.status(200).json({ facebookData: facebookData });
    } else {
      facebookData = await getFacebookData(searchWord);
      if (facebookData?.error) {
        return res.status(404).json({ error: facebookData.error as string });
      } else {
        redisClient.set(facebookKey, JSON.stringify(facebookData), {
          EX: 5 * 60,
        });
        console.log('Cache stored for', facebookKey);
        return res.status(200).json({ facebookData: facebookData });
      }
    }
  }
};
export const getGoogleServiceData = async (req: Request, res: Response) => {
  const searchWord: string = (req.query.search as string).toLowerCase();
  const offset: number = parseInt(req.query.offset as string);
  const start: number = offset;
  const searchWordSchema = Joi.string().min(3).max(30).required();
  const { error } = searchWordSchema.validate(searchWord);
  if (error) {
    console.log(error);
    return res.status(401).json({ error: error.details[0].message });
  } else if (!error) {
    const googleKey = searchWord + `_google_${offset}`;
    const googleRedisData: { itemList?: Item[] } | null = await getRedisData(googleKey);
    let googleData: { itemList?: Item[], error?:string } | null;
    if (googleRedisData !== null) {
      googleData = googleRedisData
      console.log('Cache hit for', googleKey);
      return res.status(200).json({ googleData: googleData });
    } else {
      googleData = await getGoogleData(searchWord, start);
      if (googleData?.error) {
        return res.status(404).json({ error: googleData.error as string });
      } else {
        redisClient.set(googleKey, JSON.stringify(googleData), {
          EX: 15 * 60,
        });
        console.log('Cache stored for', googleKey);
        return res.status(200).json({ googleData: googleData });
      }
    }
  }
};
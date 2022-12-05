import e, { Express, Request, Response, Router } from 'express';
import { getFacebookData } from '../services/facebookService.js';
import { getEbayData } from '../services/ebayService.js';
import { redisClient } from '../db/redis.js';

export const getServicesData = async (req: Request, res: Response) => {
  let searchWord: string = (req.query.search as string).toLowerCase();
  let limit: number = parseInt(req.query.limit as string);
  let offset: number = parseInt(req.query.offset as string);
  // const key = searchWord;
  // getGData(searchWord).then(data => {
  //   res.json(data)
  // })
  // const value = await redisClient.get(key);
  //   if (value) {
  //     let results = JSON.parse(value);
  //     res.json(results)
  //     console.log('Cache hit for', key);
  //   } else {
  //     getFacebookData(searchWord, page).then((data) => {
  //     res.json(data)
  //     console.log('Cache miss for', key);
  //     redisClient.setEx(key, 300, JSON.stringify(data));
  //   })
  //   }
  const {response, ebayData} = await getEbayData(searchWord, limit, offset);
  const facebookData = await getFacebookData(searchWord)

  if(response?.status == 200){
    if(ebayData){
      // return res.status(200).json({facebookData: facebookData, ebayData: ebayData.itemList, offset: ebayData.offset});
      return res.status(200).json(ebayData)
    }
    else {
      res.send("You are not lucky today!")
    }
  }
  
};

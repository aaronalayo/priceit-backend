import { Express, Request, Response, Router } from 'express';
import { getFacebookData } from '../services/facebookService.js';
import { getEbayData } from '../services/ebayService.js';
import { redisClient } from '../db/redis.js';

export const getServicesData = async (req: Request, res: Response) => {
  let searchWord: string = (req.query.search as string).toLowerCase();
  let page: number = Number(req.query.page as string);
  let url: string = req.query.url as string;

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
  const data = await getEbayData(searchWord, url);
  return res.json(data);
};

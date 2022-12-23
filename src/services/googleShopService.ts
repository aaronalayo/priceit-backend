import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { Item } from '../types/item';
import { createGoogleItems } from '../utils/createGoogleItems.js';
dotenv.config();

const secret = process.env.GSECRET;
/**
 * Data from Google Shop API.
 */
export const getGoogleData = async (searchWord: string, start: number) => {
  const num: string = '10';
  const url = `https://serpapi.com/search.json?tbm=shop&location=United+Kingdom&hl=en&gl=uk&google_domain=google.co.uk&q=${searchWord}&start=${start}&api_key=${secret}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data: any = {};
    console.log(response)
    data = await response.json();
    // console.log("createGoogleItems googleData: ", data )
    const itemList = createGoogleItems(data);
    if (itemList) {
      // console.log("createGoogleItems googleData: ", googleData )
      return itemList;
    }
  } catch (e) {
    console.log('API OUTPUT ERROR: ' + e);
  }
  return null
};

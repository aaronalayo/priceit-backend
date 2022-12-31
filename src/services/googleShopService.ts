import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { createGoogleItems } from '../utils/createGoogleItems.js';
dotenv.config();

const secret = process.env.GSECRET;
/**
 * Data from Google Shop API.
 */
export const getGoogleData = async (searchWord: string, start: number) => {
  const num = '10';
  const url = `https://serpapi.com/search.json?tbm=shop&location=United+Kingdom&hl=en&gl=uk&google_domain=google.co.uk&q=${searchWord}&start=${start}&api_key=${secret}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data: unknown = {};
    data = await response.json();
    const itemList = createGoogleItems(data);
    if (itemList) {
      return itemList;
    }
  } catch (e) {
    console.log('API OUTPUT ERROR: ' + e);
  }
  return null
};
// const SerpApi = require('google-search-results-nodejs');
// const search = new SerpApi.GoogleSearch('4ad18f5463840cdadf6142d503ea1a0a333c8d17382042feb3ff029065b0f12c');
// const params = {
//   device: 'desktop',
//   engine: 'google',
//   q: 'iphone',
//   location: 'Denmark',
//   google_domain: 'google.dk',
//   gl: 'dk',
//   hl: 'da',
//   num: '10',
//   start: '10',
//   no_cache: 'true',
//   tbm: 'shop',
// };
// const callback = function (data) {
//   console.log(data);
// };
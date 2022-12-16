import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { createGoogleItems } from '../utils/createGoogleItems.js';
dotenv.config();


const secret = process.env.GSECRET;
/**
 * Data from Google Shop API.
 */
export const getGoogleData = async (searchWord: string, start: string) => {
  const url = `https://serpapi.com/search.json?tbm=shop&location=United+Kingdom&hl=en&gl=uk&google_domain=google.co.uk&num=10&q=${searchWord}&start=${start}&api_key=${secret}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data: any = {};
    data = await response.json();
    // console.log("createGoogleItems googleData: ", data )
    const googleData = createGoogleItems(data);
    // console.log("createGoogleItems googleData: ", googleData )
    return googleData;
  } catch (e) {
    console.log('API OUTPUT ERROR: ' + e);
  }
  return [];
};

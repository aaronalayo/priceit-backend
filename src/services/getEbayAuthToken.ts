import EbayAuthToken from 'ebay-oauth-nodejs-client';
import * as dotenv from 'dotenv';
dotenv.config();
import { PRODUCTION } from '../types/ebayDev';

// const sandBox: SANDBOX = {
//   clientId: process.env.APP_ID as string,
//   clientSecret: process.env.CLIENT_SECRET as string,
//   baseUrl: process.env.BASE_URL as string,
//   redirectUri: process.env.REDIRECT_URI as string,
//   env: 'SANDBOX',
// };

const production: PRODUCTION = {
  clientId: process.env.PROD_APP_ID as string,
  clientSecret: process.env.PROD_CLIENT_SECRET as string,
  baseUrl: process.env.PROD_BASE_URL as string,
  redirectUri: process.env.PROD_REDIRECT_URI as string,
  env: 'PRODUCTION',
};
export const ebayAuthToken = new EbayAuthToken(production);

import EbayAuthToken from 'ebay-oauth-nodejs-client';
import * as dotenv from 'dotenv';
dotenv.config();
import { SANDBOX } from '../types/sandbox';

const sandBox: SANDBOX = {
  clientId: process.env.APP_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  baseUrl: process.env.BASE_URL as string,
  redirectUri: process.env.REDIRECT_URI as string,
  env: 'SANDBOX',
};

export const ebayAuthToken = new EbayAuthToken(sandBox);

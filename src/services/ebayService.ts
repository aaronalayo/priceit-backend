import fetch from 'node-fetch';
import { ebayAuthToken } from './getEbayAuthToken.js';
import { createEbayItems } from '../utils/createEbayItems.js'

export const getEbayData = async (searchWord: string, newUrl: string | undefined) => {
  const token = await ebayAuthToken.getApplicationToken('SANDBOX');
  let url: string = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${searchWord}&limit=3`;
  if (newUrl !== undefined) {
    url = newUrl;
  }
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',
      }
    });
    let data: any = {};
    data = await response.json();
    const ebayData : {} = createEbayItems(data)
    return ebayData;
  } catch (e) {
    console.log('Error happened', e);
  }
  return {};
};

import fetch from 'node-fetch';
import { ebayAuthToken } from './getEbayAuthToken.js';
import { createEbayItems } from '../utils/createEbayItems.js';

/**
 * Data from Ebay Browser API.
 */
export const getEbayData = async (searchWord: string, limit: number, offset: number) => {
  const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${searchWord}&limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',
      },
    });
    let data: any = {};
    // console.log(response);
    data = await response.json();
    // console.log('Ebayservice getEbayData, data:', data);
    const {itemList, offset} = createEbayItems(data);
    return { itemList, offset };
  } catch (e) {
    console.log('Error happened', e);
  }
  return null;
};

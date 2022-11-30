import fetch from 'node-fetch';
import { ebayAuthToken } from '../services/getEbayAuthToken.js';
import { ItemEbay } from '../types/itemEbay';
var itemList: ItemEbay[] = [];
export const getEbayData = async (searchWord: string) => {
  const token = await ebayAuthToken.getApplicationToken('SANDBOX');
  try {
    const response = await fetch(`https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${searchWord}&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_DE',
        'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',
      },
    });
    let data: any = {};
    data = await response.json();
    console.log(data)
    data.itemSummaries.forEach((item: any) => {

      const ebayItem: ItemEbay = {
        id: item.itemId,
        title: item.title,
        price: {
          value: item.price.value,
          currency: item.price.currency,
        },
        image: {
          height: undefined,
          width: undefined,
          uri: item.image.imageUrl,
        },
      };
      itemList.push(ebayItem)
    });
    console.log(itemList)
    return itemList;
  } catch (e) {
    console.log('Error happened', e);
  }
  return [];
};

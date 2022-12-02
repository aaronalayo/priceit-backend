import fetch from 'node-fetch';
import { modifyFacebookRequestBody } from '../utils/modifyFacebookRequestBody.js';
import { createFacebookItems } from '../utils/createFacebookItems.js';

export const getFacebookData = async (searchWord: string, page: number) => {
  const newBody = modifyFacebookRequestBody(searchWord, page);
  try {
    const response = await fetch('https://www.facebook.com/api/graphql/', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,es;q=0.8,da;q=0.7',
        'content-type': 'application/x-www-form-urlencoded',
        'x-fb-friendly-name': 'CometMarketplaceSearchContentPaginationQuery',
        'x-fb-lsd': '1TsS8KjSM-DgvvoCKbyau4',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: newBody,
      method: 'POST',
    });
    let data: any = {};
    data = await response.json();
    let itemList = createFacebookItems(data);
    // console.log("facebook.ts.getFacebookData: itemList", itemList);
    return itemList;
  } catch (e) {
    console.log('Error happened', e);
  }
  return [];
};

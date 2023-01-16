import fetch from 'node-fetch';
import { modifyFacebookRequestBody } from '../utils/modifyFacebookRequestBody.js';
import { createFacebookItems } from '../utils/createFacebookItems.js';
import { Item } from '../types/item.js';

/**
 * Data from Facebook Graph API.
 */
export const getFacebookData = async (searchWord: string) => {
  const newBody = modifyFacebookRequestBody(searchWord);
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
    // console.log(response);
    let data: unknown = {};
    if (response.status === 200) {
      data = await response.json();
      const facebookData:{
        itemList: Item[];
        error?: undefined;
    } | {
        error: string;
        itemList?: undefined;
    } | undefined = createFacebookItems(data);
      return facebookData;
    } else {
      console.log(response.statusText);
    }
  } catch (e) {
    console.log('Error happened', e);
  }
  return null;
};

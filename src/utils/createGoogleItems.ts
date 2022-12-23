import { Item } from '../types/item';
/**
 * Returns a list of google shop items.
 */

export const createGoogleItems = async (data: any) => {
  const itemList: Item[] =[];
  try {
    
    for (const item of data.shopping_results) {
      const product: Item = {
        id: item.position,
        title: item.title,
        price: {
          value: item.extracted_price,
          currency: item.price.charAt(0),
        },
        image: {
          uri: item.thumbnail,
        },
        itemRef: item.link,
      };
      itemList.push(product);
    }
    return {itemList: itemList};
  } catch (error) {
    console.log(error)
  }
 return null
};

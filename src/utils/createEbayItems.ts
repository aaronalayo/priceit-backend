import { off } from 'process';
import { Item } from '../types/item';
/**
 * Returns a list of ebay  items.
 */
export function createEbayItems(data: any) {
  const itemList: Item[] = [];
  const offset: number = data.offset;
  if(data.itemSummaries){
    data.itemSummaries.forEach((item: any) => {
      const ebayItem: Item = {
        id: item.itemId,
        title: item.title,
        price: {
          value: parseFloat(item.price.value),
          currency: item.price.currency,
        },
  
        image: {
          height: undefined,
          width: undefined,
          uri: item.image?.imageUrl,
        },
        itemRef: item.itemAffiliateWebUrl,
      };
  
      itemList.push(ebayItem);
    });
    
    return { itemList: itemList, offset: offset };
  }else{
    return { itemList:[], offset:offset}
  }
  

}

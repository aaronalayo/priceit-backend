import { off } from 'process';
import { ItemEbay } from '../types/itemEbay';
export function createEbayItems(data: any) {
  var itemList: ItemEbay[] = [];
  data.itemSummaries.forEach((item: any) => {
      const ebayItem: ItemEbay = {
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

  let offset: number = data.offset;
  // console.log(itemList.length)
  return { itemList: itemList, offset: offset };
}

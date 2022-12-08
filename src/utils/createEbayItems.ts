import { off } from 'process';
import { Item } from '../types/item';
export function createEbayItems(data: any) {
  const itemList: Item[] = [];
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

  const offset: number = data.offset;
  // console.log(itemList.length)
  return { itemList: itemList, offset: offset };
}

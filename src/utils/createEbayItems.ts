import { Item } from '../types/item';
/**
 * Returns an array of ebay  items.
 */
export function createEbayItems(data: any) {
  const itemList: Item[] = [];
  const offset: number = data.offset;
  if (data.itemSummaries) {
    data.itemSummaries.forEach((item: any) => {
      const ebayItem: Item = {
        id: item.itemId,
        title: item.title,
        price: {
          value: parseFloat(item.price.value),
          currency: item.price.currency,
        },
        image: {
          uri: item.image?.imageUrl,
        },
        itemRef: item.itemAffiliateWebUrl,
      };

      itemList.push(ebayItem);
    });
    return { itemList: itemList, offset: offset };
  } else {
    return { error:"Nothing found on Ebay..." };
  }
}

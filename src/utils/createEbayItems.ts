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
          uri: item.thumbnailImages[0].imageUrl,
        },
        itemRef: item.itemAffiliateWebUrl,
      };
  
      itemList.push(ebayItem);
    });
    let nextPage: string | undefined = data.next;
    let prevPage: string | undefined = data.prev;
    // console.log(itemList.length)
    return { itemList: itemList, nextPage: nextPage, prevPage: prevPage };
  }
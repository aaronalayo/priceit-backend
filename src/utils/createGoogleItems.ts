import { Item } from '../types/item';
export const createGoogleItems = async (data: any) => {
  const itemList: Item[] = [];
  for (const item of data.shopping_results) {
    const product: Item = {
      id: item.position,
      title: item.title,
      price: {
        value: item.extracted_price,
        currency: item.price.charAt(0),
      },
      image: {
        height: undefined,
        width: undefined,
        uri: item.thumbnail,
      },
      itemRef: item.link,
    };
    itemList.push(product);
  }

  return itemList;
};

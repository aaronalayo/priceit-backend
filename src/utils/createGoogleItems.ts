import { ItemGoogle } from '../types/itemGoogle';
export const createGoogleItems = async (data: any) => {
  var itemList: ItemGoogle[] = [];
  for (let item of data.shopping_results) {
    const product: ItemGoogle = {
      id: item.position,
      title: item.title,
      price: {
        value: item.extracted_price,
        currency: item.price.charAt(0),
      },
      image: {
        height:undefined,
        width:undefined,
        uri:item.thumbnail
      },
      itemRef: item.link,
    };
    itemList.push(product);
  }

  return itemList;
};

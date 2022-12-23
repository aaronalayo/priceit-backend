
import _ from 'lodash';
import { Item } from '../types/item';
export const compareData = async (a: {itemList?:Item[]} | null, b: {itemList?:Item[]} | null) => {

  a?.itemList?.sort((a, b) => (a.id > b.id ? -1 : 1));
  b?.itemList?.sort((a, b) => (a.id > b.id ? -1 : 1));

const result = _.isEqual(a,b)
return result
};


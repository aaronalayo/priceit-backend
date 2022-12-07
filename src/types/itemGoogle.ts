import { Image } from './image';

export type ItemGoogle = {
    id:string,
    title:string,
    price:Price,
    image: Image,
    itemRef:string,
};
type Price = {
    value:number,
    currency:string
  }
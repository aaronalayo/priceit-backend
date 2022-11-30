import {Image} from './image'
export type ItemEbay = {
    id:string,
    title:string,
    price:Price,
    image: Image
  }

  type Price = {
    value:string,
    currency:string
  }
import { Image } from './image' 
export type ItemFacebook = {
    id:string,
    title:string,
    price:Price,
    image: Image
  }

  type Price ={
    text:string
  }
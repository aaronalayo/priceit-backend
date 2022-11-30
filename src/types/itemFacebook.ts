import { Image } from './image' 
export type ItemFacebook = {
    id:string,
    title:string,
    price:Price,
    image: Image
    itremRef:string
  }

  type Price ={
    text:string
  }
import fetch from "node-fetch";
import { ItemGoogle } from '../types/itemGoogle'
import * as dotenv from 'dotenv'
dotenv.config()
var itemList: ItemGoogle[] = []
const secret = process.env.GSECRET;
export const getGData = async (searchWord : string ) => {
try {
    const response = await fetch(`https://serpapi.com/search.json?tbm=shop&engine=google&q=${searchWord}&api_key=${secret}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    let data: any = {}
    data = await response.json()
    const resultString = JSON.stringify(data)
    const resultJson = JSON.parse(resultString)
    for (let item of resultJson.shopping_results) {
            const product:ItemGoogle = {
                id: item.position,
                title: item.title,
                price: item.price,
                image: item.thumbnail,
                source: item.source,
                link: item.link
            }
            itemList.push(product)
    }
    return itemList
} catch (e) {
    console.log('API OUTPUT ERROR: ' + e)
}
return []
}
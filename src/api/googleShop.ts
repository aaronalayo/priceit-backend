import fetch, { Headers } from "node-fetch";
import { Item } from '../types/item'
import * as dotenv from 'dotenv'
dotenv.config()
var itemList: Item[] = []

const secret = process.env.GSECRET;

export const getGData = async (searchWord : string ) => {
    await fetch(`https://serpapi.com/search.json?tbm=shop&engine=google&q=${searchWord}&api_key=${secret}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response =>{
    return response.json();
}).then( data =>{ 
    
    try {
    const resultString = JSON.stringify(data)
    const resultJson = JSON.parse(resultString)
    const resultsList = Object.entries(resultJson)


    // console.log(resultJson)
    for (let item of resultJson.shopping_results) {

            const product:Item = {
                id: item.position,
                title: item.title,
                price: item.price,
                image: item.thumbnail
            }
            console.log(product)
            itemList.push(product)
    }
    return itemList

    } catch (e) {
        console.log('API OUTPUT ERROR: ' + e)
    }

})
}
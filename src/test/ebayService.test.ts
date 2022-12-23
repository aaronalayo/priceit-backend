import { Item } from "../types/item.js"
import {getEbayData} from "../services/ebayService.js"
const searchWord: string = "samsung"
const limit: number = 10
const offset: number = 0
describe("Data from Ebay Browser API", ()=>{
    test(" getEbayData from Ebay Browse API, expect to get an object with itemList array and offset", async () => {
        const data = await getEbayData(searchWord, limit, offset)
        expect(data?.itemList).toBeDefined()
        expect(Array.isArray(data?.itemList)).toBe(true)
        expect(data?.itemList?.length).toBe(10)
        data?.itemList?.map((item, index) =>{
            const { title, ...remaining} = data?.itemList[index]
            expect(item).toMatchObject({
                ...remaining,
                title: expect.stringMatching(/samsung/i)
            })
        })
    })
})
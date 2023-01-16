import {getEbayData} from "../services/ebayService.js"
const searchWord = "samsung"
const limit= 10
const offset = 0
describe("Data from Ebay Browser API", ()=>{
    test("expect to get an object with itemList array and offset and item title to contain searchWord", async () => {
        const data = await getEbayData(searchWord, limit, offset)
        expect(data?.offset).toBe(0);
        expect(data?.itemList).toBeDefined()
        expect(Array.isArray(data?.itemList)).toBe(true)
        expect(data?.itemList?.length).toBe(10)
        expect(data).toBeDefined()
        expect(data?.itemList?.[0]).toMatchObject({title: expect.stringMatching(/samsung/i)})
        if(data?.itemList){
            data?.itemList?.map((item, index) =>{
                const { ...remaining} = data.itemList?.[index] || undefined
                expect(item).toMatchObject({
                    ...remaining,
                    title:expect.stringMatching(/samsung/i)
                })
            })
        }
        if(data?.itemList){
            data?.itemList?.map((item, index) =>{
                const { ...remaining} = data.itemList?.[index] || undefined
                expect(item).toMatchObject({
                    ...remaining,
                    title:expect.not.stringMatching(/iphone/i)
                })
            })
        }
    
    })
})

        

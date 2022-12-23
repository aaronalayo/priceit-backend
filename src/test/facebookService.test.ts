import { getFacebookData } from "../services/facebookService.js"
import { Item } from "../types/item.js"
const searchWord: string = "samsung"
describe(" Data from Facebook Graph API", () =>{
    test("getFacebookData from from Facebook Graph API, expect to get an array with itemList ", async () => {
        const data = await getFacebookData(searchWord)
        expect(data).toBeDefined()
        expect(Array.isArray(data?.itemList)).toBe(true)
        expect(data?.itemList[0]).toMatchObject({title: expect.stringMatching(/samsung/i)})
        data?.itemList?.map((item, index) =>{
            const { title, ...remaining} = data.itemList[index]
            expect(item).toMatchObject({
                ...remaining,
                title:expect.stringMatching(/samsung/i)
            })
        })
    })
})
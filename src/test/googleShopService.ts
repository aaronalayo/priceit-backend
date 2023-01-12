import { getGoogleData } from '../services/googleShopService.js';
import { Item } from '../types/item.js';
const searchWord = 'samsung';
const start = 10;
describe(' Data from Google Shop API', () => {
  test('getGoogleData from from Facebook Graph API, expect to get an array ', async () => {
    const data = await getGoogleData(searchWord, start);
    expect(data).toBeDefined();
    expect(Array.isArray(data?.itemList)).toBe(true)
    expect(data?.itemList[0]).toMatchObject({title: expect.stringMatching(/samsung/i)})
    // data?.itemList.map((item, index) =>{
    //     const  ...remaining} = data.itemList[index]
    //     expect(item).toMatchObject({
    //         ...remaining,
    //         title: expect.stringMatching(/iphone/i)
    //     })
    // })
  });
});

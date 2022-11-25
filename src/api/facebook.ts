import fetch from "node-fetch";
import qs from 'querystring'
import { Item } from '../types/item'
var itemList: Item[] = []

export const getData = async (searchWord : string ) => {
  const body:string = "av=0&__user=0&__a=1&__dyn=7xeUmBwjbgmwCwRyWzEsheC1swgE98nwgU6C4UKewSAAwCxW4E2czobohxi2i3qcw9m7oqx61BwvU2Vwb-q3q5Voy6o2xwbG783pwKx-8wlU-cBweq0wXAy85iaxq3m7Eaoy15wJwBgK4oK227Ua831wLwKwFxe0H8-7Eox21uwjojxm&__csr=&__req=l&__beoa=0&__pc=PHASED%3ADEFAULT&dpr=2&__rev=1001662448&__s=aw8z00%3Asobw97%3Az0y5t9&__hsi=6788100950301358546-0&lsd=AVqtNhkO&jazoest=2748&__spin_r=1001662448&__spin_b=trunk&__spin_t=1580477913&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=MarketplaceNewSearchFeedPaginationQuery&variables=%7B%22count%22%3A16%2C%22cursor%22%3A%22%7B%5C%22pg%5C%22%3A0%2C%5C%22b2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22%5C%22%2C%5C%22it%5C%22%3A0%2C%5C%22hmsr%5C%22%3Afalse%2C%5C%22tbi%5C%22%3A0%7D%2C%5C%22c2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22AboZViCziur4EpVnWRWwdavBcJPPWqTrfg8iD56vK04vkKWAiDcN8b1XuNuthTcfJNzbH1Y3KMGJjO6LO2JBJaVKm3FHtbYsXLh3ch8Q2JY36VQTJVVARYuTq-ZPYiBEZ3EI3zcPM9iYvrWkDU-JjYqv6Y8DN7gRdBsBWFF8lVZngfNzx5sEofhN99gWRf1T9pIiIb35TyqF3PpKrNlgRwNIOtxgss2rm-WNqED5B6SGuHIasYrPkaLwtbcwC5NRGRMHT88aGhq-7mIpzoyBQhF2OPqjeZ-wH18TbW1Jz5byh-CzqUSMKRVb3X-M1jnlHNK_m75oWn9kRbeSGBlUEfTlAlK7i6MXfv3E8Nn_Hf5kEcRL7TyVyYLagFk8Q5OClYwj6gXEKWsE9lirRGHTQvUT%5C%22%2C%5C%22it%5C%22%3A8%2C%5C%22rpbr%5C%22%3A%5C%22%5C%22%2C%5C%22rphr%5C%22%3Afalse%7D%2C%5C%22irr%5C%22%3Afalse%7D%22%2C%22MARKETPLACE_FEED_ITEM_IMAGE_WIDTH%22%3A196%2C%22VERTICALS_LEAD_GEN_PHOTO_HEIGHT_WIDTH%22%3A40%2C%22MERCHANT_LOGO_SCALE%22%3Anull%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22airpods%22%7D%2C%22browse_request_params%22%3A%7B%22filter_location_id%22%3A%22112967818720513%22%2C%22commerce_search_sort_by%22%3A%22BEST_MATCH%22%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%7D%2C%22custom_request_params%22%3A%7B%22surface%22%3A%22SEARCH%22%2C%22search_vertical%22%3A%22C2C%22%7D%7D%7D&doc_id=2846705378683003"
  const parsed = qs.parse(body) 
  console.log(parsed)
  const variables =  JSON.parse(JSON.parse(JSON.stringify(parsed.variables)))
  console.log(variables)
  variables.params.bqf.query = searchWord
  parsed.variables = JSON.stringify(variables)
  const newBody = qs.stringify(parsed)
  
  try {
      const response = await fetch("https://www.facebook.com/api/graphql/", {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        body: newBody,
        method: "POST"
      });
      let data: any ={}
       data = await response.json();
      
      for (const edge of data.data.marketplace_search.feed_units.edges) {
        if (edge.node) {
          // console.log(edge.node.listing)
          const product:Item  = {
            id:edge.node.listing.id, 
            title: edge.node.listing.marketplace_listing_title, 
            price: edge.node.listing.formatted_price,
            image: {
              height: edge.node.listing.primary_listing_photo.image.height,
              width:edge.node.listing.primary_listing_photo.image.width, 
              uri: edge.node.listing.primary_listing_photo.image.uri}
            }
          itemList.push(product)
          
        }
       
      }
      
    } catch (e) {
      console.log("Error happened", e);
    }
    return itemList
    // return itemList
  };

import qs from 'querystring';
export function modifyFacebookRequestBody(searchWord: string) {
  const body =
    'av=0&__user=0&__a=1&__dyn=7xeUmBwjbgmwCwRyWzEsheC1swgE98nwgU6C4UKewSAAwCxW4E2czobohxi2i3qcw9m7oqx61BwvU2Vwb-q3q5Voy6o2xwbG783pwKx-8wlU-cBweq0wXAy85iaxq3m7Eaoy15wJwBgK4oK227Ua831wLwKwFxe0H8-7Eox21uwjojxm&__csr=&__req=l&__beoa=0&__pc=PHASED%3ADEFAULT&dpr=2&__rev=1001662448&__s=aw8z00%3Asobw97%3Az0y5t9&__hsi=6788100950301358546-0&lsd=AVqtNhkO&jazoest=2748&__spin_r=1001662448&__spin_b=trunk&__spin_t=1580477913&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=MarketplaceNewSearchFeedPaginationQuery&variables=%7B%22count%22%3A16%2C%22cursor%22%3A%22%7B%5C%22pg%5C%22%3A0%2C%5C%22b2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22%5C%22%2C%5C%22it%5C%22%3A0%2C%5C%22hmsr%5C%22%3Afalse%2C%5C%22tbi%5C%22%3A0%7D%2C%5C%22c2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22AboZViCziur4EpVnWRWwdavBcJPPWqTrfg8iD56vK04vkKWAiDcN8b1XuNuthTcfJNzbH1Y3KMGJjO6LO2JBJaVKm3FHtbYsXLh3ch8Q2JY36VQTJVVARYuTq-ZPYiBEZ3EI3zcPM9iYvrWkDU-JjYqv6Y8DN7gRdBsBWFF8lVZngfNzx5sEofhN99gWRf1T9pIiIb35TyqF3PpKrNlgRwNIOtxgss2rm-WNqED5B6SGuHIasYrPkaLwtbcwC5NRGRMHT88aGhq-7mIpzoyBQhF2OPqjeZ-wH18TbW1Jz5byh-CzqUSMKRVb3X-M1jnlHNK_m75oWn9kRbeSGBlUEfTlAlK7i6MXfv3E8Nn_Hf5kEcRL7TyVyYLagFk8Q5OClYwj6gXEKWsE9lirRGHTQvUT%5C%22%2C%5C%22it%5C%22%3A8%2C%5C%22rpbr%5C%22%3A%5C%22%5C%22%2C%5C%22rphr%5C%22%3Afalse%7D%2C%5C%22irr%5C%22%3Afalse%7D%22%2C%22MARKETPLACE_FEED_ITEM_IMAGE_WIDTH%22%3A196%2C%22VERTICALS_LEAD_GEN_PHOTO_HEIGHT_WIDTH%22%3A40%2C%22MERCHANT_LOGO_SCALE%22%3Anull%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22airpods%22%7D%2C%22browse_request_params%22%3A%7B%22filter_location_id%22%3A%22112967818720513%22%2C%22commerce_search_sort_by%22%3A%22BEST_MATCH%22%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%7D%2C%22custom_request_params%22%3A%7B%22surface%22%3A%22SEARCH%22%2C%22search_vertical%22%3A%22C2C%22%7D%7D%7D&doc_id=2846705378683003';
  const parsed = qs.parse(body);
  // console.log(parsed)
  const variablesString = JSON.stringify(parsed.variables);
  const variables = JSON.parse(JSON.parse(variablesString));
  variables.params.bqf.query = searchWord;
  // console.log("facebook.ts.getFacebookData: variables", variables)
  // console.log("facebook.ts.getFacebookData: count original", variables.count)
  const cursor = JSON.parse(JSON.parse(JSON.stringify(variables.cursor)));
  // console.log("facebook.ts.getFacebookData: cursor", cursor)
  // cursor.pg = page;
  variables.count = 16;
  // cursor.c2c.it = variables.count * page
  variables.cursor = JSON.stringify(cursor);
  parsed.variables = JSON.stringify(variables);
  // console.log("facebook.ts.getFacebookData: variables final",variables)
  const newBody = qs.stringify(parsed);
  return newBody;
}
// fetch('https://www.facebook.com/api/graphql/', {
//   headers: {
//     accept: '*/*',
//     'accept-language': 'en-US,en;q=0.9,es;q=0.8,da;q=0.7',
//     'content-type': 'application/x-www-form-urlencoded',
//     'sec-ch-prefers-color-scheme': 'light',
//     'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"Windows"',
//     'sec-fetch-dest': 'empty',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'same-origin',
//     'viewport-width': '939',
//     'x-fb-friendly-name': 'CometMarketplaceSearchContentContainerQuery',
//     'x-fb-lsd': 'rDp9cbAXFREe1cwqZ6bzly',
//     cookie:
//       'datr=AV2vY5gI_Sc6YrzqTTwxwGHE; sb=BF2vY_2IIIkfvbXBlG7-lek-; c_user=812585373; xs=35%3Al-aIjjEFVJVB-Q%3A2%3A1672436997%3A-1%3A4520; fr=0B8lB7WQmWzGEPfLA.AWU3X4oPhoTEpuMU9P373QxP6sw.Bjr10E.nE.AAA.0.0.Bjr10I.AWWk8UZ8bss; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1672437003726%2C%22v%22%3A1%7D; wd=939x1329',
//     Referer: 'https://www.facebook.com/marketplace/copenhagen/search/?query=kallax',
//     'Referrer-Policy': 'strict-origin-when-cross-origin',
//   },
//   body: 'av=812585373&__user=812585373&__a=1&__dyn=7AzHJ16U9ob8ng5K8G6EjBWo2nDwAxu13wsoKbgS3q2ibwyzE2qwJyEiwsobo6u3y4o2Gwn82nwb-q7oc81xoswMwto88422y11xmfz83WwgEcHzoaEnxO0Bo7O2l2Utwwwi831wiEjwZwlo5qfK0zEkxe2GewGwkUtxGm2SUbElxm3y3aexfxmu3W3y261eBx_y88E6a0BFobpEbUGdG0HE88cA0z8c84qifxe3u364UrwFg662S26&__csr=gjMiMx2Ldb6ij8TsQJMHNsy4NcBnRddkjQDX5W_Qin8yaiRl97iYRaWhkhkWGjlbSquF9bG9G-cup4QGG4uiiFaGFDVrTmEZkQFpedz8TACAAZ-8yEGl6UjgGmbUSeyorCyawGgK4oixeu7o9VbGeyKiU-4EixeaxeEeqCxii225Hxumu78C2-FVU4y2S1EwtU421lBwjE-awi84i1fwi8dUvwyyoeouz8O2WqbwOK1jzEG0ga3K0ddw2240iy04gU0tNw37o5q3tw15C04Oo04Q-01a8widppe222J08W2e0ZZ0n82Uw5nK1Pw4uw3gE0Gtw9Wm0tK0b0w1Zm047o2Pa0mObAx-awzw3fEJ01Jq05ZC0dqK0YE0lGgdE4m0XU0g5gao3swh81Go2wwty0to6u&__req=3g&__hs=19356.HYP%3Acomet_pkg.2.1.0.2.1&dpr=1&__ccg=EXCELLENT&__rev=1006774051&__s=xb9fga%3Avwa0gs%3A0mnmld&__hsi=7183062220599377654&__comet_req=15&fb_dtsg=NAcO5t_WaDlhfTDO1sB90vzpr4yDg2eUjOxEquVNaOVT6jf16YH-ypg%3A35%3A1672436997&jazoest=25538&lsd=rDp9cbAXFREe1cwqZ6bzly&__aaid=637827461003605&__spin_r=1006774051&__spin_b=trunk&__spin_t=1672437000&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CometMarketplaceSearchContentContainerQuery&variables=%7B%22buyLocation%22%3A%7B%22latitude%22%3A55.68085%2C%22longitude%22%3A12.57268%7D%2C%22contextual_data%22%3Anull%2C%22count%22%3A24%2C%22cursor%22%3Anull%2C%22flashSaleEventID%22%3A%22%22%2C%22hasFlashSaleEventID%22%3Afalse%2C%22marketplaceSearchMetadataCardEnabled%22%3Atrue%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22samsung%20s22%20ultra%22%7D%2C%22browse_request_params%22%3A%7B%22commerce_enable_local_pickup%22%3Atrue%2C%22commerce_enable_shipping%22%3Atrue%2C%22commerce_search_and_rp_available%22%3Atrue%2C%22commerce_search_and_rp_category_id%22%3A%5B%5D%2C%22commerce_search_and_rp_condition%22%3Anull%2C%22commerce_search_and_rp_ctime_days%22%3Anull%2C%22filter_location_latitude%22%3A55.68085%2C%22filter_location_longitude%22%3A12.57268%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%2C%22filter_radius_km%22%3A19%7D%2C%22custom_request_params%22%3A%7B%22browse_context%22%3Anull%2C%22contextual_filters%22%3A%5B%5D%2C%22referral_code%22%3Anull%2C%22saved_search_strid%22%3Anull%2C%22search_vertical%22%3A%22C2C%22%2C%22seo_url%22%3Anull%2C%22surface%22%3A%22SEARCH%22%2C%22virtual_contextual_filters%22%3A%5B%5D%7D%7D%2C%22savedSearchID%22%3Anull%2C%22savedSearchQuery%22%3A%22samsung%20s22%20ultra%22%2C%22scale%22%3A1%2C%22shouldIncludePopularSearches%22%3Afalse%2C%22topicPageParams%22%3A%7B%22location_id%22%3A%22copenhagen%22%2C%22url%22%3Anull%7D%2C%22vehicleParams%22%3A%22%22%7D&server_timestamps=true&doc_id=6238687802818710',
//   method: 'POST',
// });

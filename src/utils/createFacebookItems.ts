import { Item } from '../types/item';

/**
 * Returns a list of facebook  items.
 */
export function createFacebookItems(data: any) {
  const itemList: Item[] = [];
  if (data.data.marketplace_search.feed_units.edges) {
    for (const edge of data.data.marketplace_search.feed_units.edges) {
      if (edge.node) {
        // console.log( edge.node.listing.formatted_price.text.slice(3))
        const product: Item = {
          id: edge.node.listing.id,
          title: edge.node.listing.marketplace_listing_title,
          price: {
            value: parseInt(edge.node.listing.formatted_price.text.slice(3).replace(/,/g, '')),
            currency: edge.node.listing.formatted_price.text.slice(0, 2),
          },
          image: {
            uri: edge.node.listing.primary_listing_photo.image.uri,
          },
          itemRef: edge.node.listing.share_uri,
        };
        // console.log(itemList)
        itemList.push(product);
      }
    }
    if (itemList.length > 0) {
      return { itemList: itemList };
    } else {
      return { error: 'Nothing found on Facebook...' };
    }
  }
}

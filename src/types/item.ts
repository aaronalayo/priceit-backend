export type Item = {
  id: string
  title: string
  price: Price
  image: Image
  itemRef: string
};

type Price = {
  value: number
  currency: string
};
type Image = {
  height: number | undefined
  width: number | undefined
  uri: string | undefined
};

export type Item = {
  id: string;
  title: string;
  price: Price;
  image: Image;
  itemRef: string;
};

type Price = {
  value: number;
  currency: string;
};
type Image = {
  uri: string | undefined;
};

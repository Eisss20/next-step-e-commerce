// types.ts
export type ProductType = {
  id: number;
  name: string;
  net_price: number;
  image: string;
  price_per_unit: number;
  images: string[];
  category: Array<string>;
  description: string;
  discount_percent?: number;
};

// types.ts
interface ProductImage {
  id: number;
  url: string;
  position: number;
}

export type ProductType = {
  id: number;
  name: string;
  color: string;
  price_per_unit: number;
  net_price: number;
  description: string;
  head_detail: string;
  detail_product: string;
  discount_percent: number;
  sale_status: boolean;
  category: {
    id: number;
    name: string;
  };
  label: {
    id: number;
    name: string;
  };
  images: ProductImage[]; // นี่คือส่วนสำคัญ
  sizes: Array<{
    id: number;
    size: string;
    stock: number;
    status: string;
  }>;
};
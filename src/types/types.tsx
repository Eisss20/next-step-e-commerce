// types.ts

export type ProductType = {
  id: string;
  name: string;
  color: string;
  price_per_unit: number;
  net_price: number;
  description: string;
  head_detail?: string;
  detail_product?: string;
  discount_percent?: number;
  sale_status: boolean;
  category: {
    id: number;
    name: string;
  };
  label: {
    id: number;
    name: string;
  };
  images: {
    id: number;
    url: string;
    position?: number;
  }[];
  sizes: {
    id: number;
    size: string;
    stock: number;
    status: string;
  }[];
};

// =================== NEW API TYPES ===================

// สำหรับรับข้อมูลรูปภาพเมื่อสร้างสินค้า
export interface ProductImageInput {
  url: string;
  position?: number;
}

// สำหรับรับข้อมูลขนาดเมื่อสร้างสินค้า
export interface ProductSizeInput {
  size: string;
  stock?: number;
  status?: string;
}

// สำหรับรับข้อมูลทั้งหมดเมื่อสร้างสินค้า
export interface CreateProductBody {
  product_id: string;
  product_name: string;
  color_name: string;
  price_per_unit: number;
  net_price: number;
  description: string;
  category_id: number;
  head_detail: string;
  detail_product: string;
  label_id: number;
  discout_percent?: number;
  sale_status?: boolean;
  images?: ProductImageInput[];
  sizes?: ProductSizeInput[];
}

// สำหรับ API Response
export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// สำหรับ Product Response
export type ProductResponse = APIResponse<ProductType>;

// =================== DATABASE MODELS ===================

// สำหรับ Category
export interface Category {
  category_id: number;
  category_name: string;
}

// สำหรับ Label
export interface Label {
  label_id: number;
  label_name: string;
}

// สำหรับ Size Stock
export interface SizeStock {
  size_stock_id: number;
  product_id: string;
  size_detail: string;
  stock_quantity: number;
  status_stock: string;
}

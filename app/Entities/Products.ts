export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductResponse {
  items: Product[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

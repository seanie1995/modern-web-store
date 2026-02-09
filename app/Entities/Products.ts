export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  slug: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

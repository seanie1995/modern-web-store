// utils/FetchData.ts
import { Product } from "../Entities/Products";

export const FetchProducts = async (): Promise<Product[]> => {
  const url = "https://api.escuelajs.co/api/v1/products?limit=10&offset=0";

  const res = await fetch(url);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch products");
  }

  return (await res.json()) as Product[];
};

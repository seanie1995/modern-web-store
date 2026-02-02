// utils/FetchData.ts
import { Product } from "../Entities/Products";

export const FetchProducts = async (): Promise<Product[]> => {
  const url = "https://api.escuelajs.co/api/v1/products?limit=6&offset=0";

  const res = await fetch(url);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch products");
  }

  return (await res.json()) as Product[];
};

export async function FetchSingleProduct(id: string): Promise<Product | null> {
  if (!id) return null;

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

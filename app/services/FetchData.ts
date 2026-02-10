// utils/FetchData.ts
import { Product } from "../Entities/Products";

export const FetchProducts = async (
  limit: number,
  offset: number = 0,
): Promise<Product[]> => {
  const url = `https://fakestoreapi.com/products/?limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};

export async function FetchSingleProduct(id: number): Promise<Product | null> {
  if (!id) return null;

  try {
    const url = `https://fakestoreapi.com/products/${id}`;

    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

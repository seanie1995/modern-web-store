// utils/FetchData.ts
import { Product } from "../Entities/Products";

const URL_API = `https://fakestoreapi.com`;

export const FetchProducts = async (
  limit: number,
  sort: string = "asc",
  page: number = 1,
): Promise<Product[]> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort: sort,
    page: page.toString(),
  });

  console.log(`${params}`);

  const res = await fetch(`${URL_API}/products/?${params}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data;
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

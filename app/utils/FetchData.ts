// utils/FetchData.ts
import { Category, Product } from "../Entities/Products";

export const FetchProducts = async (
  limit: number,
  offset: number = 0,
): Promise<Product[]> => {
  const url = `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch products");
  }

  return await res.json();
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

export async function FetchCategories(): Promise<Category[]> {
  const url = `https://api.escuelajs.co/api/v1/categories`;

  const res = await fetch(url);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch categories");
  }

  const json = await res.json();

  const data: Category[] = json.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.image,
  }));

  return data;
}

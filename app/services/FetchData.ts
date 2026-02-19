// utils/FetchData.ts
import { Product, RawProduct } from "../Entities/Products";

const URL_API = "https://dummyjson.com";
export const FetchProducts = async (
  limit: number,
  order: string = "asc",
  page: number = 1,
  sortBy: string,
): Promise<Product[]> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    order: order,
    page: page.toString(),
    sortBy: sortBy,
  });

  const res = await fetch(`${URL_API}/products/?${params}`);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch products");
  }

  const response = await res.json();

  const rawData = response.products as RawProduct[];

  const data: Product[] = rawData.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    thumbnail: item.thumbnail,
    image: item.images[0],
  }));

  return data;
};

export async function FetchSingleProduct(id: number): Promise<Product | null> {
  if (!id) return null;

  try {
    /*  const url = `https://fakestoreapi.com/products/${id}`; */

    const url = `${URL_API}/products/${id}`;

    const res = await fetch(url);

    const rawProduct = await res.json();

    if (!res.ok) return null;

    const product: Product = {
      id: rawProduct.id,
      title: rawProduct.title,
      price: rawProduct.price,
      description: rawProduct.description,
      category: rawProduct.category,
      image: rawProduct.images[0],
      thumbnail: rawProduct.thumbnail,
    };

    return product;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// utils/FetchData.ts
import { Product, ProductResponse, RawProduct } from "../Entities/Products";

const URL_API = "https://dummyjson.com";
export const FetchProducts = async (
  limit: number,
  order: string = "asc",
  skip: number = 0,
  sortBy: string,
): Promise<ProductResponse> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    order: order,
    skip: skip.toString(),
    sortBy: sortBy,
  });

  const res = await fetch(`${URL_API}/products/?${params}`);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch products");
  }

  const response = await res.json();

  return response;
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

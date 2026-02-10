import React from "react";
import ProductCard from "../ProductCard";
import { Product } from "@/app/Entities/Products";
import { FetchProducts } from "@/app/services/FetchData";

const ProductGrid = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { limit = "6", sort = "asc" } = await searchParams;

  const currentLimit = Number(Array.isArray(limit) ? limit[0] : limit);

  const sortDirectionString = Array.isArray(sort) ? sort[0] : sort;

  const products = await FetchProducts(currentLimit, sortDirectionString);

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-2/3 mx-auto py-8">
      {products && Array.isArray(products) ? (
        products.map((i, index) => <ProductCard data={i} key={i.id || index} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductGrid;

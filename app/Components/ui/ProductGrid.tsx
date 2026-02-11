import React from "react";
import ProductCard from "../ProductCard";

import { FetchProducts } from "@/app/services/FetchData";
import LimitSelect from "./LimitSelect";
import Pagination from "./Pagination";

const ProductGrid = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { limit = "6", sort = "asc", page = "1" } = await searchParams;

  const currentLimit = Number(Array.isArray(limit) ? limit[0] : limit);
  const sortDirectionString = Array.isArray(sort) ? sort[0] : sort;
  const currentPage = Number(Array.isArray(page ? page[0] : page));

  const products = await FetchProducts(currentLimit, sortDirectionString);

  const total = products.length;

  return (
    <section>
      <div className="container mx-auto flex gap-4 pt-8 px-4 w-2/3 ">
        Displaying <LimitSelect /> out of {total} items
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-2/3  mx-auto py-8 ">
        {products && Array.isArray(products) ? (
          products.map((i, index) => (
            <ProductCard data={i} key={i.id || index} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <Pagination totalPages={2} />
    </section>
  );
};

export default ProductGrid;

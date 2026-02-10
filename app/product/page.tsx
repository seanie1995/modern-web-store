"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FetchProducts } from "../services/FetchData";
import { Product } from "../Entities/Products";
import ProductCard from "../Components/ProductCard";

const PAGE_SIZE = 12;

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const offset = (page - 1) * PAGE_SIZE;
      const data = await FetchProducts(PAGE_SIZE, offset);
      setProducts((prev) => [...prev, ...data]);
      setLoading(false);
    };

    loadProducts();
  }, [page]);

  const display = useMemo(() => {
    return products.filter((i) =>
      i.title.toLowerCase().includes(searchItem.toLowerCase()),
    );
  }, [searchItem, products]);

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const buttonStyle =
    "hover:cursor-pointer hover:bg-blue-200 transition-all duration-200 border px-2 rounded-sm";

  return (
    <main className="w-2/3 mx-auto ">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="mx-auto mb-6 ">
        <input
          type="text"
          className="border py-1 px-1 rounded-xl"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Type to search..."
        />
      </div>
      {loading && <p>Loading…</p>}

      <ul className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 ">
        {display.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </ul>

      <div className="flex gap-4 mt-8 py-4 mx-auto   justify-center">
        <button className={buttonStyle} onClick={() => goToPage(page + 1)}>
          More
        </button>
      </div>
    </main>
  );
};

export default AllProducts;

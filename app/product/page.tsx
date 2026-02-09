"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FetchCategories, FetchProducts } from "../utils/FetchData";
import { Product, Category } from "../Entities/Products";
import ProductCard from "../Components/ProductCard";

const PAGE_SIZE = 12;

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
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

  useEffect(() => {
    const loadCategories = async () => {
      const dataCat = await FetchCategories();
      setCategories(dataCat);
      setSelectedCategory("None");
    };

    loadCategories();
  }, []);

  const display = useMemo(() => {
    return products.filter(
      (i) =>
        (selectedCategory === "None" || i.category.name === selectedCategory) &&
        i.title.toLowerCase().includes(searchItem.toLowerCase()),
    );
  }, [searchItem, products, selectedCategory]);

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const buttonStyle =
    "hover:cursor-pointer hover:bg-blue-200 transition-all duration-200 border px-2 rounded-sm";

  return (
    <main className="w-2/3 mx-auto ">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="mx-auto ">
        <select
          className="border py-2 px-1 rounded-xl m-2"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="None">None</option>
          {categories.map((i, index) => (
            <option key={index} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
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

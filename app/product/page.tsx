"use client";

import React, { useEffect, useState } from "react";
import { FetchCategories, FetchProducts } from "../utils/FetchData";
import { Product, Category } from "../Entities/Products";
import ProductCard from "../Components/ProductCard";

const PAGE_SIZE = 12;

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState<Product[]>([]);
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

    const loadDisplay = () => {
      const productCopy = products;
      setDisplay(productCopy);
    };

    loadDisplay();
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

  useEffect(() => {
    if (selectedCategory === "None") {
      setDisplay(products);
    } else {
      const updatedDisplay = products.filter(
        (i) => i.category.name === selectedCategory,
      );

      setDisplay(updatedDisplay);
    }
  }, [selectedCategory]);

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
          placeholder="Filter..."
          className="border py-1 px-1 rounded-xl"
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

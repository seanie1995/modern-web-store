"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "./Entities/Products";
import { FetchProducts } from "./utils/FetchData";
import ProductCard from "./Components/ProductCard";
import HeroSection from "./Components/HeroSection/HeroSection";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await FetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <main className="">
        <HeroSection />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-3/4 mx-auto py-8">
          {products.map((item) => (
            <ProductCard data={item} key={item.id} />
          ))}
        </div>
      </main>
    </div>
  );
}

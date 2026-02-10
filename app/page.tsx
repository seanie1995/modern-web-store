"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Product } from "./Entities/Products";
import { FetchProducts } from "./services/FetchData";
import ProductCard from "./Components/ProductCard";
import HeroSection from "./Components/HeroSection/HeroSection";
import SubSection from "./Components/MainSubSection/page";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await FetchProducts(6);
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
        <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-2/3 mx-auto py-8">
          {products.map((item) => (
            <ProductCard data={item} key={item.id} />
          ))}
        </div>
        <SubSection />
      </main>
    </div>
  );
}

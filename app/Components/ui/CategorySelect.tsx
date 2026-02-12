"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type CategoryProps = {
  categories: string[];
};

const CategorySelect: React.FC<CategoryProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select onChange={handleCategoryChange} value={currentCategory}>
      <option value="">Select a category</option>
      {categories.map((i, index) => (
        <option key={index} value={i}>
          {i}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;

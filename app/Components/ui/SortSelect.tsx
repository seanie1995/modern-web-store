"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SortSelect = () => {
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sortDirection") || "asc";

  const createSortURL = (direction: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", "id");
    params.set("order", direction);

    return `?${params.toString()}`;
  };
  return (
    <div className="flex gap-4">
      <p>Sort order: </p>
      <Link
        href={createSortURL("asc")}
        className={currentSort === "asc" ? "font-bold" : ""}
      >
        ascending
      </Link>
      <Link
        href={createSortURL("desc")}
        className={currentSort === "desc" ? "font-bold" : ""}
      >
        descending
      </Link>
    </div>
  );
};

export default SortSelect;

"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import path from "path";
import Link from "next/link";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-4 m-6">
      {currentPage > 1 && (
        <>
          <Link href={createPageURL(1)}>First</Link>
          <Link href={createPageURL(currentPage - 1)}>&larr; Previous</Link>
        </>
      )}
      {currentPage < totalPages && (
        <>
          <Link href={createPageURL(currentPage + 1)}>Next &rarr;</Link>
          <Link href={createPageURL(totalPages)}>Last</Link>
        </>
      )}
    </div>
  );
};

export default Pagination;

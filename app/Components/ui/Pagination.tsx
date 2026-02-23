"use client";

import { usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSkip = Number(searchParams.get("skip")) || 0;

  const limit = Number(searchParams.get("limit")) || 6;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("skip", pageNumber.toString());
    console.log(params);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-4 m-6">
      {currentSkip > 1 && (
        <>
          <Link href={createPageURL(1)}>First</Link>
          <Link href={createPageURL(currentSkip - limit)}>&larr; Less</Link>
        </>
      )}
      {currentSkip < totalPages && (
        <>
          <Link href={createPageURL(currentSkip + limit)}>More &rarr;</Link>
          <Link href={createPageURL(totalPages)}>Last</Link>
        </>
      )}
    </div>
  );
};

export default Pagination;

"use client";

import { usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";

const Pagination = ({ totalSkip }: { totalSkip: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSkip = Number(searchParams.get("skip")) || 0;

  const limit = Number(searchParams.get("limit")) || 6;

  const toggleSkip = (skipCount: number | string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("skip", skipCount.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-4 m-6">
      <Link href={toggleSkip(currentSkip + limit)}>More</Link>
      {currentSkip !== 0 && (
        <Link href={toggleSkip(currentSkip - limit)}>Less</Link>
      )}
    </div>
  );
};

export default Pagination;

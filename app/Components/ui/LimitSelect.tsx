"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LimitSelect = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const limit = searchParams.get("limit") || "6";

  const ITEM_LIMITS = ["6", "8", "12"];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = event.target.value;

    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", newLimit);
    params.set("page", "1");

    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <form>
      <label className="sr-only" htmlFor="limit-select">
        Limit:
      </label>
      <select
        id="limit-select"
        name="limit"
        onChange={handleChange}
        defaultValue={limit}
      >
        {ITEM_LIMITS.map((item) => (
          <option key={`limit-select-${item}`} value={item}>
            {item}
          </option>
        ))}
      </select>
    </form>
  );
};

export default LimitSelect;

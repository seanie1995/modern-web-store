import ProductCard from "../ProductCard";

import { FetchProducts } from "@/app/services/FetchData";
import LimitSelect from "./LimitSelect";
import Pagination from "./Pagination";
import SortSelect from "./SortSelect";
import CategorySelect from "./CategorySelect";

const ProductGrid = async ({
  searchParams,
  mainPage,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  mainPage?: boolean;
}) => {
  const {
    limit = "6",
    order = "asc",
    skip = "0",
    sortBy = "id",
  } = await searchParams;

  const currentLimit = Number(Array.isArray(limit) ? limit[0] : limit);
  const sortDirectionString = Array.isArray(order) ? order[0] : order;
  const currentSkip = Number(Array.isArray(skip) ? skip[0] : skip);
  const sortQuery = Array.isArray(sortBy) ? sortBy[0] : sortBy;

  const res = await FetchProducts(
    currentLimit,
    sortDirectionString,
    currentSkip,
    sortQuery,
  );

  const products = res.products;

  const categoriesSet = new Set(products.map((i) => i.category));

  const categories = [...categoriesSet];

  const total = res.total;

  const filterStyling = "container mx-auto flex gap-4 pt-8 px-4 w-2/3 ";

  return (
    <section>
      {mainPage ? (
        <div>
          <div className={filterStyling}>
            Displaying <LimitSelect /> out of {total} items
          </div>{" "}
          <div className={filterStyling}>
            <SortSelect />
          </div>
          {/* <div className={filterStyling}>
            <CategorySelect categories={categories} />
          </div> */}
        </div>
      ) : null}

      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-2/3  mx-auto py-8 ">
        {products && Array.isArray(products) ? (
          products.map((i, index) => (
            <ProductCard product={i} key={i.id || index} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      {mainPage ? (
        <Pagination totalSkip={Math.ceil(total / currentLimit)} />
      ) : null}
    </section>
  );
};

export default ProductGrid;

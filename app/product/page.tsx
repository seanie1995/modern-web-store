import { FetchProducts } from "../services/FetchData";
import { Product, ProductResponse } from "../Entities/Products";
import ProductCard from "../Components/ProductCard";

const PAGE_SIZE = 12;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const AllProducts = async ({ searchParams }: PageProps) => {
  const { limit = "9", sort = "asc", page = 1 } = await searchParams;

  const currentLimit = Number(Array.isArray(limit) ? limit[0] : limit);
  const currentPage = Number(Array.isArray(page) ? page[0] : page);
  const sortDirectionString = Array.isArray(sort) ? sort[0] : sort;

  const { items, total, pages } = await FetchProducts(
    currentLimit,
    sortDirectionString,
    currentPage,
  );

  const display = items;

  const buttonStyle =
    "hover:cursor-pointer hover:bg-blue-200 transition-all duration-200 border px-2 rounded-sm";

  return (
    <main className="w-2/3 mx-auto ">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      {/*  <div className="mx-auto mb-6 ">
        <input
          type="text"
          className="border py-1 px-1 rounded-xl"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Type to search..."
        />
      </div>
      {loading && <p>Loading…</p>} */}

      <ul className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 ">
        {display.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </ul>

      <div className="flex gap-4 mt-8 py-4 mx-auto   justify-center">
        <button className={buttonStyle}>More</button>
      </div>
    </main>
  );
};

export default AllProducts;

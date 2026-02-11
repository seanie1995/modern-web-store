import { FetchProducts } from "../services/FetchData";
import { Product } from "../Entities/Products";
import ProductCard from "../Components/ProductCard";
import ProductGrid from "../Components/ui/ProductGrid";

const PAGE_SIZE = 12;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const AllProducts = async ({ searchParams }: PageProps) => {
  const buttonStyle =
    "hover:cursor-pointer hover:bg-blue-200 transition-all duration-200 border px-2 rounded-sm";

  return (
    <main className=" mx-auto">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold m-6">All Products</h1>
      </div>

      <div>
        {" "}
        <ProductGrid searchParams={searchParams} />
      </div>
    </main>
  );
};

export default AllProducts;

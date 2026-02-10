import { Product } from "@/app/Entities/Products";
import { FetchSingleProduct } from "@/app/services/FetchData";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = await FetchSingleProduct(id);

  return {
    title: `${product?.title}`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await FetchSingleProduct(id);

  if (!product) {
    return (
      <main className="p-4">
        <h1>Product not found</h1>
        <p>Sorry, this product does not exist or could not be loaded.</p>
      </main>
    );
  }

  return (
    <main className="w-2/3 mx-auto flex p-8">
      <div className=" p-12 flex flex-col align-center  gap-8 ">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <span>
          <strong>Price:</strong> {product.price}:-
        </span>
        <span>
          <strong>Description:</strong> <br></br>
          {product.description}
        </span>
      </div>

      <div>
        {" "}
        <figure>
          <Image
            src={product.image}
            alt={product.title}
            width={1440}
            height={100}
          />
        </figure>
      </div>
    </main>
  );
}

import { Product } from "@/app/Entities/Products";
import { FetchSingleProduct } from "@/app/utils/FetchData";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: string }>;
};

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
            src={product.images[0]}
            alt={product.category.name}
            width={1440}
            height={100}
          />
        </figure>
        <div className="mt-4">
          <strong>Images:</strong>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {product.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                width={200}
                height={100}
                className="border border-gray-300 rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

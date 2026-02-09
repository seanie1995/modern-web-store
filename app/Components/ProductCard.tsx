import React, { ReactNode } from "react";
import { Product } from "../Entities/Products";
import Image from "next/image";
import Link from "next/link";

type ProductProps = {
  data: Product;
};

const ProductCard: React.FC<ProductProps> = ({ data }) => {
  const { title, price, description, category, images, slug, id } = data;

  return (
    <div className=" border-gray-600 bg-sky-100 p-4 rounded-2xl">
      <figure>
        <Image
          src={images[0]}
          alt="Product image"
          width={600}
          height={400}
          unoptimized
        />
      </figure>
      <h3 className="text-xl font-bold ">{title}</h3>
      <h4>Category: {category.name}</h4>
      <h5 className="font-bold">{price}:-</h5>
      <Link
        href={`/product/${slug}`}
        className="font-bold hover:cursor-pointer hover:text-blue-500 transition-all duration-200"
      >
        More Info
      </Link>
    </div>
  );
};

export default ProductCard;

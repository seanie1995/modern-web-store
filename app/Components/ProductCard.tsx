import React, { ReactNode } from "react";
import { Product } from "../Entities/Products";
import Image from "next/image";
import Link from "next/link";

type ProductProps = {
  data: Product;
};

const ProductCard: React.FC<ProductProps> = ({ data }) => {
  const { title, price, description, category, id, image } = data;

  return (
    <div className=" border-gray-600 bg-sky-100 p-4 rounded-2xl flex flex-col justify-between  ">
      <figure className="flex justify-center">
        <Image
          src={image}
          alt="Product image"
          width={175}
          height={100}
          loading="eager"
        />
      </figure>
      <div>
        {" "}
        <h3 className="text-xl font-bold ">{title}</h3>
        <h5 className="font-bold">{price}:-</h5>
        <Link
          href={`/product/${id}`}
          className="font-bold hover:cursor-pointer hover:text-blue-500 transition-all duration-200"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

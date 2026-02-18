import React, { ReactNode } from "react";
import { Product } from "../Entities/Products";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";

type ProductProps = {
  product: Product;
};

const ProductCard: React.FC<ProductProps> = async ({ product }) => {
  const { title, price, description, category, id, thumbnail } = product;

  const res = await fetch(
    `http://localhost:3000/api/like?productName=${title}`,
    { cache: "no-store" },
  );

  const data = await res.json();

  const intialLikes = data.likes || 0;

  return (
    <div className=" border-gray-600 bg-sky-100 p-4 rounded-2xl flex flex-col justify-between  ">
      <figure className="flex justify-center">
        <Image
          src={thumbnail}
          alt="Product image"
          width={175}
          height={100}
          loading="eager"
        />
      </figure>
      <div>
        {" "}
        <h3 className="text-lg font-bold ">{title}</h3>
        <h5 className="font-bold">{price}:-</h5>
        <Link
          href={`/product/${id}`}
          className="font-bold hover:cursor-pointer hover:text-blue-500 transition-all duration-200"
        >
          More Info
        </Link>
      </div>
      <LikeButton productName={title} initialLikes={intialLikes} />
    </div>
  );
};

export default ProductCard;

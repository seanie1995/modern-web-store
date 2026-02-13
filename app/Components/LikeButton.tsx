"use client";

import React from "react";
import { useState } from "react";

type LikeButtonProps = {
  productName: string;
  initialLikes: number;
};

const LikeButton = ({ productName, initialLikes }: LikeButtonProps) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = async () => {
    const newHasLiked = !hasLiked;
    setHasLiked(newHasLiked);

    const res = await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName,
        action: newHasLiked ? "like" : "unlike",
      }),
    });

    const data = await res.json();

    setLikes(data.likes);
  };
  return (
    <button
      type="button"
      onClick={toggleLike}
      className={`h-9 px-4 rounded-md shadow-sm transition-colors ${
        hasLiked
          ? "bg-red-500 text-white"
          : "bg-gray-500 hover:cursor-pointer text-black hover:bg-blue-500 hover:text-white"
      }`}
    >
      {hasLiked ? "❤️ Liked " : "🤍 Like "}
      {likes > 0 && <span className="ml-2 font-mono">{likes}</span>}
    </button>
  );
};

export default LikeButton;

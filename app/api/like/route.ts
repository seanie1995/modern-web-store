// app/api/like/route.ts
import { NextResponse } from "next/server";

const likesStore = new Map<string, number>();

export async function POST(request: Request) {
  const { productName, action } = await request.json();
  const currentLikes = likesStore.get(productName) || 0;
  const newLikes =
    action === "like" ? currentLikes + 1 : Math.max(currentLikes - 1, 0);

  likesStore.set(productName, newLikes);

  return NextResponse.json({ productName, likes: newLikes });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productName = searchParams.get("productName");

  if (!productName) {
    return NextResponse.json(
      { error: "Product Name Required" },
      { status: 400 },
    );
  }

  const likes = likesStore.get(productName) || 0;

  return NextResponse.json({ productName, likes });
}

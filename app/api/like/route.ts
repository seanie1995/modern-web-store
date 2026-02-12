// app/api/like/route.ts
import { NextResponse } from "next/server";

const likesStore = new Map<string, number>();

export async function POST(request: Request) {
  const { characterName } = await request.json();
  const currentLikes = likesStore.get(characterName) || 0;
  const newLikes = currentLikes + 1;
  likesStore.set(characterName, newLikes);

  return NextResponse.json({ likes: newLikes });
}

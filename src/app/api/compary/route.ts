import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { products } = await request.json();
    const response = await fetch("https://api.compary.ai/search", {
      method: "POST",
      headers: {
        "X-API-Key": process.env.COMPARY_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    if (!response.ok) {
      return NextResponse.error();
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.error();
  }
}

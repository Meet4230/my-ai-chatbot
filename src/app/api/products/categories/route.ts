import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });

    return NextResponse.json(categories.map((p) => p.category));
  } catch (error) {
    console.error("Error fetching categories", error);
    return NextResponse.json({
      error: "Error fetching categories",
    });
  }
}

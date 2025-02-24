import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    if (!q) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Fetch products with search and pagination
    const products = await prisma.product.findMany({
      where: {
        name: { contains: q, mode: "insensitive" },
      },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const totalProducts = await prisma.product.count({
      where: { name: { contains: q, mode: "insensitive" } },
    });

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, totalPages });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

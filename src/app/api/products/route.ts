import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    const newProduct = await prisma.product.create({
      data: body,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating Product");
    return NextResponse.json(
      {
        error: "Error creating Product",
        errorMessage: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");

    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = {};
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (minPrice) where.minPrice = { gte: Number(minPrice) };
    if (maxPrice) where.minPrice = { lte: Number(maxPrice) };

    const orderBy: any = {};
    if (sort === "price_asc") orderBy.price = "asc";
    if (sort === "price_desc") orderBy.price = "desc";
    if (sort === "latest") orderBy.createdAt = "desc";

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      orderBy,
    });

    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / take);

    return NextResponse.json({ products, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products", error);
    return NextResponse.json(
      {
        error: "Error fetching Products",
        errorMessage: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}

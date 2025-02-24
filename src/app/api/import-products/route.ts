import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

export async function POST(req: Request) {
  try {
    const products = await req.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Invalid JSON format or empty array" },
        { status: 400 }
      );
    }

    const insertedProducts = await prisma.product.createMany({
      data: products.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        tags: product.tags, // ✅ Must be an array of strings
        brand: product.brand,
        color: product.color,
        size: product.size,
        stock: product.stock,
        rating: product.rating,
        reviews: product.reviews,
        images: product.images,
        features: product.features,
        specification: product.specification,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: "Products imported successfully",
      insertedCount: insertedProducts.count,
    });
  } catch (error) {
    console.error("Error importing products:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

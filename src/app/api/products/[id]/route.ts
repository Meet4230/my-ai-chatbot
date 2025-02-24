import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findMany({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product by id", error);
    return NextResponse.json(
      {
        error: "Error fetching product by id",
      },
      {
        status: 500,
      }
    );
  }
}

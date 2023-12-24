import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body: Product = await req.json();
  const products = await prisma.product.create({
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId,
    },
  });
  return NextResponse.json(products, { status: 201 });
}

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = await prisma.product.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(products, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  console.log(body);
  const products = await prisma.product.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId,
    },
  });
  return NextResponse.json(products, { status: 200 });
}

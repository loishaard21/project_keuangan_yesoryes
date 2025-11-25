import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: any) {
  const trx = await prisma.transaction.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(trx);
}

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  const updated = await prisma.transaction.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  await prisma.transaction.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Transaction deleted" });
}

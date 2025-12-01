import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET transaction by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const trx = await prisma.transaction.findUnique({
      where: { id: Number(params.id) },
      include: {
        user: true,
        account: true,
      },
    });

    if (!trx) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(trx);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}

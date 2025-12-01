import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all transactions
export async function GET() {
  try {
    const trx = await prisma.transaction.findMany({
      include: {
        user: true,
        account: true,
      },
    });

    return NextResponse.json(trx);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}



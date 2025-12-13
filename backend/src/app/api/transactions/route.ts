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
      { error: "Gagal mendapatkan transaksi" },
      { status: 500 }
    );
  }
}

// CREATE transaction
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, type, category, description, userId, accountId } = body;

    const newTrx = await prisma.transaction.create({
      data: {
        amount,
        type,
        category,
        description,
        userId,
        accountId,
      },
    });

    return NextResponse.json(newTrx);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}



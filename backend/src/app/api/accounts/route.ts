import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all accounts
export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        user: true,
        transactions: true,
      },
    });

    return NextResponse.json(accounts);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mendapatkan akun" },
      { status: 500 }
    );
  }
}

// CREATE account
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, balance, userId } = body;

    const newAccount = await prisma.account.create({
      data: {
        name,
        balance,
        userId,
      },
    });

    return NextResponse.json(newAccount);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

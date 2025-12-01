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
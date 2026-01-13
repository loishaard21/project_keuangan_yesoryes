import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// =======================
// GET ALL ACCOUNTS
// =======================
export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        user: true,
        transactions: true,
      },
    });

    return NextResponse.json(accounts, { headers: corsHeaders });
  } catch (error) {
    console.error("GET ACCOUNTS ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mendapatkan akun" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// CREATE ACCOUNT
// =======================
export async function POST(req: Request) {
  try {
    const { name, balance, userId } = await req.json();

    if (!name || userId === undefined) {
      return NextResponse.json(
        { error: "Name dan userId wajib diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    const account = await prisma.account.create({
      data: {
        name,
        balance: balance ?? 0,
        userId,
      },
    });

    return NextResponse.json(account, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error("CREATE ACCOUNT ERROR:", error);

    return NextResponse.json(
      { error: "Gagal membuat akun" },
      { status: 500, headers: corsHeaders }
    );
  }
}

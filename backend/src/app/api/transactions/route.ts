import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// =======================
// GET ALL TRANSACTIONS
// =======================
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        account: true, // 🔥 biar dashboard tau ini transaksi akun mana
      },
    });

    return NextResponse.json(transactions, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("GET ALL TRANSACTIONS ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mendapatkan transaksi" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// CREATE TRANSACTION
// =======================
export async function POST(req: Request) {
  try {
    const { amount, type, category, userId, accountId } = await req.json();

    // VALIDASI
    if (!amount || !type || !category || !userId || !accountId) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!["INCOME", "EXPENSE"].includes(type)) {
      return NextResponse.json(
        { error: "Tipe transaksi tidak valid" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Nominal harus lebih dari 0" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 🔥 PASTIKAN ACCOUNT ADA
    const account = await prisma.account.findUnique({
      where: { id: Number(accountId) },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Account tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // 🔥 CREATE TRANSACTION
    const transaction = await prisma.transaction.create({
      data: {
        amount: Number(amount),
        type,
        category,
        userId: Number(userId),
        accountId: Number(accountId),
      },
    });

    // 🔥 UPDATE SALDO ACCOUNT
    await prisma.account.update({
      where: { id: Number(accountId) },
      data: {
        balance: {
          increment: type === "INCOME" ? Number(amount) : -Number(amount),
        },
      },
    });

    return NextResponse.json(transaction, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("CREATE TRANSACTION ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan transaksi" },
      { status: 500, headers: corsHeaders }
    );
  }
}

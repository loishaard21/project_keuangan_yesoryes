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
// GET TRANSACTION BY ID
// =======================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const transactionId = Number(id);
  if (isNaN(transactionId)) {
    return NextResponse.json(
      { error: "ID transaksi tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    return NextResponse.json(
      { error: "Transaksi tidak ditemukan" },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(transaction, { headers: corsHeaders });
}

// =======================
// UPDATE TRANSACTION
// =======================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const transactionId = Number(id);

  if (isNaN(transactionId)) {
    return NextResponse.json(
      { error: "ID transaksi tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  const body = await req.json();

  const updated = await prisma.transaction.update({
    where: { id: transactionId },
    data: body,
  });

  return NextResponse.json(updated, { headers: corsHeaders });
}

// =======================
// DELETE TRANSACTION
// =======================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const transactionId = Number(id);

  if (isNaN(transactionId)) {
    return NextResponse.json(
      { error: "ID transaksi tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  await prisma.transaction.delete({
    where: { id: transactionId },
  });

  return NextResponse.json(
    { message: "Transaksi berhasil dihapus" },
    { headers: corsHeaders }
  );
}

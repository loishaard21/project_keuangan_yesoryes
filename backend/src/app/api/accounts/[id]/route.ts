import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// =======================
// GET ACCOUNT BY ID
// =======================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const accountId = Number(params.id);

  if (isNaN(accountId)) {
    return NextResponse.json(
      { error: "ID akun tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: {
        user: true,
        transactions: true,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Akun tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(account, { headers: corsHeaders });
  } catch (error) {
    console.error("GET ACCOUNT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mendapatkan akun" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// UPDATE ACCOUNT
// =======================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const accountId = Number(params.id);

  if (isNaN(accountId)) {
    return NextResponse.json(
      { error: "ID akun tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json();

    const updated = await prisma.account.update({
      where: { id: accountId },
      data: body,
    });

    return NextResponse.json(updated, { headers: corsHeaders });
  } catch (error) {
    console.error("UPDATE ACCOUNT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui akun" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// =======================
// DELETE ACCOUNT
// =======================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const accountId = Number(params.id);

  if (isNaN(accountId)) {
    return NextResponse.json(
      { error: "ID akun tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    await prisma.account.delete({
      where: { id: accountId },
    });

    return NextResponse.json(
      { message: "Akun berhasil dihapus" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menghapus akun" },
      { status: 500, headers: corsHeaders }
    );
  }
}

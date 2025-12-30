import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// =======================
// GET USER BY ID
// =======================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const userId = Number(id);
  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "ID tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User tidak ditemukan" },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(user, { headers: corsHeaders });
}

// =======================
// UPDATE USER
// =======================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "ID tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  const { email, name, password } = await req.json();

  const data: any = {};
  if (email) data.email = email;
  if (name) data.name = name;
  if (password) data.password = await hashPassword(password);

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "Tidak ada data untuk diupdate" },
      { status: 400, headers: corsHeaders }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return NextResponse.json(updatedUser, { headers: corsHeaders });
}

// =======================
// DELETE USER
// =======================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "ID tidak valid" },
      { status: 400, headers: corsHeaders }
    );
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json(
    { message: "User berhasil dihapus" },
    { headers: corsHeaders }
  );
}

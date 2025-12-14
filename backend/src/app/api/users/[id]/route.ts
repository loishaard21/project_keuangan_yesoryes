import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

type Params = {
  params: {
    id: string;
  };
};

// =======================
// GET USER BY ID
// =======================
export async function GET(req: Request, context: Params) {
  const { id } = await context.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "ID tidak valid" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// =======================
// UPDATE USER BY ID
// =======================
export async function PUT(req: Request, context: Params) {
  try {
    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "ID tidak valid" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { email, name, password } = body;

    const data: any = {};

    if (email) data.email = email;
    if (name) data.name = name;
    if (password) {
      data.password = await hashPassword(password);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Tidak ada data untuk diupdate" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json(
      { error: "Gagal Update User" },
      { status: 500 }
    );
  }
}

// =======================
// DELETE USER BY ID
// =======================
export async function DELETE(req: Request, context: Params) {
  const { id } = await context.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "ID tidak valid" },
      { status: 400 }
    );
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json({
    message: "User berhasil dihapus",
  });
}

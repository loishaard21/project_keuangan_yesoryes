import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET account by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const account = await prisma.account.findUnique({
      where: { id: Number(params.id) },
      include: {
        user: true,
        transactions: true,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Akun Tidak Ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(account);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mendapatkan akun" },
      { status: 500 }
    );
  }
}

// UPDATE account
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.account.update({
      where: { id: Number(params.id) },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal memperbarui akun" },
      { status: 500 }
    );
  }
}

// DELETE account
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.account.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Akun berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menghapus akun" },
      { status: 500 }
    );
  }
}

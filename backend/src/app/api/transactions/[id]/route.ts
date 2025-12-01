import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET transaction by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const trx = await prisma.transaction.findUnique({
      where: { id: Number(params.id) },
      include: {
        user: true,
        account: true,
      },
    });

    if (!trx) {
      return NextResponse.json(
        { error: "Transaksi Tidak Ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(trx);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mendapatkan transaksi" },
      { status: 500 }
    );
  }
}

// UPDATE transaction
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.transaction.update({
      where: { id: Number(params.id) },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal memperbarui transaksi" },
      { status: 500 }
    );
  }
}

// DELETE transaction
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.transaction.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal menghapus transaksi" },
      { status: 500 }
    );
  }
}

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
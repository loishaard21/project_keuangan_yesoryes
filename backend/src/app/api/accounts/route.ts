import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all accounts
export async function GET() {
  const accounts = await prisma.account.findMany({
    include: {
      user: true,
      transactions: true,
    },
  });

  return NextResponse.json(accounts);
}

// CREATE account
export async function POST(req: Request) {
  const body = await req.json();
  const { name, balance, userId } = body;

  const acc = await prisma.account.create({
    data: {
      name,
      balance,
      userId,
    },
  });

  return NextResponse.json(acc);
}

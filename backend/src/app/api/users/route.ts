import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

// GET ALL USERS
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// CREATE USER
export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email dan password wajib diisi" },
      { status: 400 }
    );
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, name, password: hashed },
  });

  return NextResponse.json(user);
}

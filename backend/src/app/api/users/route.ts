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
// GET ALL USERS
// =======================
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { headers: corsHeaders });
}

// =======================
// CREATE USER
// =======================
export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, name, password: hashed },
    });

    return NextResponse.json(user, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: "Gagal membuat user" },
      { status: 500, headers: corsHeaders }
    );
  }
}
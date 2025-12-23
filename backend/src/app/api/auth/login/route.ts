import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401, headers: corsHeaders }
      );
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401, headers: corsHeaders }
      );
    }

    // 🔥 LOGIN BERHASIL
    return NextResponse.json(
      {
        message: "Login berhasil",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Login gagal" },
      { status: 500, headers: corsHeaders }
    );
  }
}

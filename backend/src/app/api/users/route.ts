import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";

// =======================
// GET ALL USERS
// =======================
export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
      transactions: true,
    },
  });

  return NextResponse.json(users);
}

// =======================
// CREATE NEW USER (POST)
// =======================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi!" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    console.error("CREATE USER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// =======================
// UPDATE USER (PUT)
// =======================
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, email, name, password } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID user wajib dikirim untuk update!" },
        { status: 400 }
      );
    }

    const dataToUpdate: any = { email, name };

    // Kalau password dikirim → hash ulang
    if (password) {
      dataToUpdate.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
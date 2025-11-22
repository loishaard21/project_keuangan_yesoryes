import { PrismaClient } from "@prisma/client";

declare global {
  // Biarkan TS tahu bahwa global.prisma itu ada
  // Jangan pernah ubah 'var' menjadi 'let' / 'const'
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// Simpan prisma ke global pada environment development
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;

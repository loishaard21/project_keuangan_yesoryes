import bcrypt from "bcryptjs";

/**
 * Hash password menggunakan bcrypt
 * @param password password plain
 * @returns string hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verifikasi password
 * @param password password plain
 * @param hashed hashed password dari database
 * @returns boolean
 */
export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
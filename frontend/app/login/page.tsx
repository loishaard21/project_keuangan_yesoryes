"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Isi semua field!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/users");
      const users = await res.json();

      const user = users.find(
        (u: any) => u.email === form.email
      );

      if (!user) {
        alert("Email tidak ditemukan");
        return;
      }

      // ⚠️ sementara tanpa compare hash
      alert("Login berhasil!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#EED4DB] px-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(45,72,57,0.3)] w-full max-w-md border border-[#D698AB]">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-[#2D4839] tracking-tight">
          Login Here
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
          <label className="block mb-2 text-sm font-bold text-[#426E55]">Email</label>
          <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              // Border default "Sleeping pink", Focus "Growing pink", Text "Sleeping green"
              className="w-full border-2 border-[#D698AB] px-4 py-3 rounded-xl outline-none focus:border-[#CB748E] focus:ring-4 focus:ring-[#CB748E]/20 transition-all text-[#2D4839] placeholder-[#D698AB]/70"
              placeholder="nama@email.com"
            />
          </div>

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded mt-2"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/registrasi")}
            className="text-blue-600 cursor-pointer"
          >
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  );
}

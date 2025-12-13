"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!form.email || !form.password) return alert("Isi semua field!");

    // Nanti bisa diganti API Login
    alert("Login berhasil!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin}>
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="contoh@mail.com"
          />

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Masukkan password"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded shadow mt-2"
          >
            Masuk
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  );
}

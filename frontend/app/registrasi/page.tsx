"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password)
      return alert("Semua field wajib diisi!");

    // Nanti bisa diganti API
    alert("Registrasi berhasil!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleRegister}>
          <label className="block mb-2 font-semibold">Nama Lengkap</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Nama kamu"
          />

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
            className="w-full bg-green-600 text-white py-2 rounded shadow mt-2"
          >
            Daftar
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

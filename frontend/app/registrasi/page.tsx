"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registrasi gagal");
        return;
      }

      alert("Registrasi berhasil, silakan login");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#FDF8F9] via-white to-[#EED4DB]">
      <div className="absolute w-96 h-96 bg-[#CB748E]/10 rounded-full blur-3xl -top-10 -left-10 pointer-events-none"></div>
      <div className="absolute w-80 h-80 bg-[#73986F]/10 rounded-full blur-3xl bottom-10 right-10 pointer-events-none"></div>

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl shadow-[#2D4839]/10 border border-white/60 w-full max-w-md relative z-10">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-[#2D4839]">
          Register
          <span className="block h-1 w-12 bg-[#CB748E] mx-auto mt-2 rounded-full"></span>
        </h1>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nama Lengkap"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>
      </div>
    </div>
  );
}

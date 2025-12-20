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
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

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

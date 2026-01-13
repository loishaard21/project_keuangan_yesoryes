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
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Isi semua field!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login gagal");
        return;
      }

            // 🔥 SIMPAN USER KE LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login berhasil!");
      router.push("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Terjadi kesalahan pada server");
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
            <label className="block mb-2 text-sm font-bold text-[#426E55]">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border-2 border-[#D698AB] px-4 py-3 rounded-xl outline-none focus:border-[#CB748E] focus:ring-4 focus:ring-[#CB748E]/20 transition-all text-[#2D4839]"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-[#426E55]">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full border-2 border-[#D698AB] px-4 py-3 rounded-xl outline-none focus:border-[#CB748E] focus:ring-4 focus:ring-[#CB748E]/20 transition-all text-[#2D4839]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 
              ${
                loading
                  ? "bg-[#73986F] cursor-not-allowed text-white"
                  : "bg-[#2D4839] hover:bg-[#426E55] text-[#EED4DB] hover:shadow-[#426E55]/40"
              }`}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#73986F]">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/registrasi")}
            className="text-[#CB748E] font-bold cursor-pointer hover:text-[#2D4839] hover:underline transition-colors"
          >
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  );
}

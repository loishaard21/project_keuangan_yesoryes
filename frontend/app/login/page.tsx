"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float-leaf {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(5px, -10px) rotate(5deg); }
        50% { transform: translate(-5px, -5px) rotate(-5deg); }
        75% { transform: translate(3px, -8px) rotate(3deg); }
      }
      @keyframes pulse-subtle {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.7; }
      }
      @keyframes slide-up {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes shimmer-green {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes checkmark {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }, []);

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

      // Animasi sukses sebelum redirect
      const button = e.currentTarget.querySelector('button[type="submit"]');
      if (button) {
        button.innerHTML = '<span class="inline-flex items-center"><svg class="w-5 h-5 mr-2 animate-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Login Berhasil!</span>';
        button.classList.add('bg-gradient-to-r', 'from-[#426E55]', 'to-[#2D4839]');
      }

      setTimeout(() => {
        alert("Login berhasil!");
        router.push("/dashboard");
      }, 1000);

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#F0F7F4] via-[#E8F3ED] to-[#E0EFE6] px-4 overflow-hidden relative">
      {/* Animated background leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-40 h-40 bg-gradient-to-br from-[#73986F]/10 to-[#426E55]/10 rounded-full top-10 left-10 animate-float-leaf" style={{ animationDuration: '15s' }}></div>
        <div className="absolute w-32 h-32 bg-gradient-to-tr from-[#2D4839]/10 to-[#73986F]/10 rounded-full bottom-20 right-10 animate-float-leaf" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        <div className="absolute w-24 h-24 bg-gradient-to-br from-[#426E55]/10 to-[#2D4839]/10 rounded-full top-1/3 right-1/4 animate-float-leaf" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
        <div className="absolute w-28 h-28 bg-gradient-to-tr from-[#73986F]/10 to-[#426E55]/10 rounded-full bottom-1/3 left-1/4 animate-float-leaf" style={{ animationDuration: '14s', animationDelay: '0.5s' }}></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-[#73986F]/10 to-[#426E55]/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-l from-[#2D4839]/10 to-[#73986F]/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none animate-pulse-subtle" style={{ animationDelay: '2s' }}></div>

      {/* Main card */}
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl shadow-[#2D4839]/10 border border-white/50 w-full max-w-md relative z-10 animate-slide-up" style={{ animation: 'slide-up 0.6s ease-out' }}>
        {/* Leaf decorative header */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-2 bg-gradient-to-r from-[#73986F] to-[#426E55] rounded-full"></div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#CB748E] to-[#D698AB] rounded-full"></div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-[#2D4839] tracking-tight">
          Selamat Datang Kembali
        </h1>
        <p className="text-center text-[#73986F] mb-8 text-sm">Silakan login untuk melanjutkan</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="animate-slide-up" style={{ animation: 'slide-up 0.7s ease-out 0.1s both' }}>
            <label className="block mb-3 text-sm font-semibold text-[#426E55] flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-white/95 border-2 border-[#73986F]/30 text-[#2D4839] px-4 py-3.5 rounded-xl outline-none focus:border-[#426E55] focus:ring-3 focus:ring-[#73986F]/20 transition-all duration-300 placeholder-[#73986F]/50 hover:border-[#73986F]/50 hover:shadow-sm hover:shadow-[#2D4839]/5"
              placeholder="nama@email.com"
            />
          </div>

          <div className="animate-slide-up" style={{ animation: 'slide-up 0.7s ease-out 0.2s both' }}>
            <label className="block mb-3 text-sm font-semibold text-[#426E55] flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full bg-white/95 border-2 border-[#73986F]/30 text-[#2D4839] px-4 py-3.5 rounded-xl outline-none focus:border-[#426E55] focus:ring-3 focus:ring-[#73986F]/20 transition-all duration-300 placeholder-[#73986F]/50 hover:border-[#73986F]/50 hover:shadow-sm hover:shadow-[#2D4839]/5"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden group animate-slide-up ${
              loading
                ? "bg-gradient-to-r from-[#73986F] to-[#426E55] cursor-not-allowed text-white"
                : "bg-gradient-to-r from-[#2D4839] via-[#426E55] to-[#73986F] hover:shadow-xl hover:shadow-[#426E55]/30 text-white hover:-translate-y-1"
            }`}
            style={{ 
              animation: 'slide-up 0.7s ease-out 0.3s both',
              backgroundSize: '200% 100%'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </>
              )}
            </span>
            {/* Shimmer effect */}
            {!loading && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#73986F]/20 animate-slide-up" style={{ animation: 'slide-up 0.7s ease-out 0.4s both' }}>
          <p className="text-center text-sm text-[#73986F]">
            Belum punya akun?{" "}
            <button
              onClick={() => router.push("/registrasi")}
              className="text-[#426E55] font-semibold cursor-pointer hover:text-[#2D4839] hover:underline underline-offset-2 transition-colors duration-300 inline-flex items-center group"
            >
              Daftar sekarang
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </p>
        </div>

        {/* Leaf pattern footer */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gradient-to-br from-[#73986F] to-[#426E55] rounded-full opacity-50"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
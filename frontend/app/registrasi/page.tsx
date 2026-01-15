"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

  // Animasi floating elements
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-180deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }
      @keyframes slide-in {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#F8FBF9] via-[#F1F8F4] to-[#E9F5EF]">
      {/* Animated background elements - hanya warna hijau */}
      <div className="fixed w-[500px] h-[500px] bg-gradient-to-r from-[#73986F]/15 to-[#426E55]/15 rounded-full blur-3xl top-10 -left-40 pointer-events-none animate-pulse-glow"></div>
      <div className="fixed w-[400px] h-[400px] bg-gradient-to-l from-[#2D4839]/10 to-[#73986F]/10 rounded-full blur-3xl bottom-10 -right-40 pointer-events-none animate-pulse-glow" style={{animationDelay: '2s'}}></div>
      
      {/* Floating decorative elements - fixed position */}
      <div className="fixed w-32 h-32 bg-gradient-to-br from-[#73986F]/20 to-[#2D4839]/10 rounded-3xl top-20 left-10 pointer-events-none animate-float" style={{animationDuration: '8s'}}></div>
      <div className="fixed w-24 h-24 bg-gradient-to-tr from-[#426E55]/15 to-[#73986F]/15 rounded-2xl bottom-20 right-12 pointer-events-none animate-float-delayed" style={{animationDuration: '10s'}}></div>
      <div className="fixed w-16 h-16 bg-gradient-to-br from-[#2D4839]/10 to-[#426E55]/10 rounded-full top-1/3 right-1/4 pointer-events-none animate-float" style={{animationDuration: '12s'}}></div>
      <div className="fixed w-20 h-20 bg-gradient-to-tr from-[#73986F]/15 to-[#2D4839]/10 rounded-3xl bottom-1/3 left-1/4 pointer-events-none animate-float-delayed" style={{animationDuration: '9s'}}></div>

      {/* Main card with animation */}
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl shadow-[#2D4839]/10 border border-white/50 w-full max-w-md relative z-10 animate-slide-in my-8" style={{animation: 'slide-in 0.6s ease-out'}}>
        {/* Decorative header accent */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-[#73986F] to-[#426E55] rounded-full"></div>
        
        <h1 className="text-3xl font-bold text-center mb-2 text-[#2D4839] relative">
          <span className="relative z-10">Create Account</span>
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#73986F] to-[#426E55] rounded-full"></span>
        </h1>
        <p className="text-center text-[#73986F] text-sm mb-8">Bergabung dengan komunitas kami</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="animate-slide-in" style={{animation: 'slide-in 0.7s ease-out 0.1s both'}}>
            <label className="block mb-2 text-sm font-semibold text-[#426E55]">Nama Lengkap</label>
            <input
              placeholder="Masukkan nama lengkap"
              className="w-full bg-white/95 border border-[#73986F]/30 text-[#2D4839] placeholder-[#73986F]/50 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#426E55] focus:ring-3 focus:ring-[#73986F]/20 transition-all duration-300 hover:border-[#73986F]/50 hover:shadow-sm hover:shadow-[#2D4839]/5"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="animate-slide-in" style={{animation: 'slide-in 0.7s ease-out 0.2s both'}}>
            <label className="block mb-2 text-sm font-semibold text-[#426E55]">Email</label>
            <input
              type="email"
              placeholder="contoh@email.com"
              className="w-full bg-white/95 border border-[#73986F]/30 text-[#2D4839] placeholder-[#73986F]/50 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#426E55] focus:ring-3 focus:ring-[#73986F]/20 transition-all duration-300 hover:border-[#73986F]/50 hover:shadow-sm hover:shadow-[#2D4839]/5"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="animate-slide-in" style={{animation: 'slide-in 0.7s ease-out 0.3s both'}}>
            <label className="block mb-2 text-sm font-semibold text-[#426E55]">Password</label>
            <input
              type="password"
              placeholder="Minimal 8 karakter"
              className="w-full bg-white/95 border border-[#73986F]/30 text-[#2D4839] placeholder-[#73986F]/50 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#426E55] focus:ring-3 focus:ring-[#73986F]/20 transition-all duration-300 hover:border-[#73986F]/50 hover:shadow-sm hover:shadow-[#2D4839]/5"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#426E55] via-[#73986F] to-[#426E55] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-[#2D4839]/20 hover:shadow-xl hover:shadow-[#2D4839]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none relative overflow-hidden group animate-slide-in"
            style={{
              animation: 'slide-in 0.7s ease-out 0.4s both',
              backgroundSize: '200% 100%'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Daftar Sekarang
                </>
              )}
            </span>
            {/* Shimmer effect */}
            {!loading && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            )}
          </button>
        </form>

        {/* Footer note */}
        <div className="mt-8 pt-6 border-t border-[#73986F]/20 animate-slide-in" style={{animation: 'slide-in 0.7s ease-out 0.5s both'}}>
          <p className="text-center text-sm text-[#73986F]">
            Sudah punya akun?{" "}
            <button 
              onClick={() => router.push('/login')}
              className="text-[#426E55] font-semibold hover:text-[#2D4839] underline underline-offset-2 transition-colors duration-300 inline-flex items-center group"
            >
              Login disini
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </p>
        </div>

        {/* Decorative dots footer */}
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
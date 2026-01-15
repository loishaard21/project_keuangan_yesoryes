"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function PengaturanPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [name, setName] = useState("Nama Pengguna");
  const [email, setEmail] = useState("email@example.com");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const [language, setLanguage] = useState("id");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  // Set initial values from localStorage if available
  useEffect(() => {
    if (user) {
      setName(user.name || "Nama Pengguna");
      setEmail(user.email || "email@example.com");
    }
  }, [user]);

  const handleSaveProfile = () => {
    alert("Profil berhasil diperbarui");
  };

  const handleChangePassword = () => {
    if (!oldPass || !newPass) {
      alert("Isi semua kolom password");
      return;
    }
    alert("Password berhasil diperbarui");
    setOldPass("");
    setNewPass("");
  };

  const handleResetData = () => {
    const confirmReset = confirm(
      "Apakah Anda yakin ingin menghapus semua data keuangan? Tindakan ini tidak dapat dibatalkan."
    );
    if (confirmReset) {
      alert("Semua data berhasil direset");
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f4] via-[#e8f4ee] to-[#d9ede3] text-[#2D4839]">
      {/* ================= OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#2D4839]/40 z-40 backdrop-blur-sm animate-fadeIn"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#2D4839] to-[#426E55] text-white p-6 z-50 shadow-2xl transform transition-all duration-500 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10 border-b border-[#73986F]/40 pb-4">
          <h1 
            className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-white to-[#D698AB] bg-clip-text text-transparent animate-slideInLeft"
          >
            CERDAS FINANSIAL
          </h1>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="text-white/70 hover:text-white transition-all duration-300 hover:rotate-90 p-1"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-3">
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Transaksi", path: "/transaksi" },
            { label: "Laporan", path: "/laporan" },
            { label: "Anggaran", path: "/anggaran" },
            { label: "Pengaturan", path: "/pengaturan" },
          ].map((item, index) => (
            <div
              key={item.path}
              className="animate-slideInLeft"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden ${
                  pathname === item.path
                    ? "bg-white/20 backdrop-blur-sm text-white font-bold shadow-lg border border-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10">{item.label}</span>
                <div
                  className={`ml-auto relative z-10 transition-all duration-300 ${
                    pathname === item.path ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                >
                  →
                </div>
              </Link>
            </div>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="p-6">
        {/* ================= TOP BAR ================= */}
        <div 
          className="flex justify-between items-center mb-8 animate-slideInDown"
        >
          <div className="flex items-center gap-4">
            {/* HAMBURGER BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 bg-white/90 hover:bg-white rounded-xl shadow-sm border border-[#73986F]/20 transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              <span 
                className={`block w-6 h-0.5 bg-gradient-to-r from-[#2D4839] to-[#426E55] mb-1.5 transition-all duration-300 ${
                  sidebarOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-gradient-to-r from-[#2D4839] to-[#426E55] mb-1.5 transition-all duration-300 ${
                  sidebarOpen ? "opacity-0" : ""
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-gradient-to-r from-[#2D4839] to-[#426E55] transition-all duration-300 ${
                  sidebarOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#2D4839] via-[#426E55] to-[#73986F] bg-clip-text text-transparent">
              Pengaturan
            </h1>
          </div>

          {/* ================= PROFILE MENU ================= */}
          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-3 bg-white/95 px-5 py-2.5 rounded-full shadow-lg border border-[#73986F]/20 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#73986F] to-[#426E55] flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0) || "A"}
              </div>
              <span className="text-sm font-bold text-[#2D4839]">{user?.name || "Akun"}</span>
              <div className={`transition-transform duration-200 ${openUserMenu ? "rotate-180" : ""}`}>
                ▼
              </div>
            </button>

            {/* DROPDOWN MENU */}
            {openUserMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#73986F]/20 overflow-hidden z-30 animate-slideInDown"
              >
                <Link 
                  href="/pengaturan" 
                  className="block px-5 py-4 text-[#2D4839] hover:bg-gradient-to-r from-[#EED4DB]/20 to-[#f9f9f9] transition-all duration-300 group"
                  onClick={() => setOpenUserMenu(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#73986F] to-[#426E55] flex items-center justify-center text-white text-sm">
                      👤
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform">Profil Saya</span>
                  </div>
                </Link>
                <div className="h-px bg-gradient-to-r from-transparent via-[#73986F]/20 to-transparent mx-4"></div>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpenUserMenu(false);
                  }}
                  className="w-full text-left px-5 py-4 text-[#CB748E] font-bold hover:bg-gradient-to-r from-[#fff0f3] to-[#f9f9f9] transition-all duration-300 group hover:scale-[1.02] active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CB748E] to-[#D698AB] flex items-center justify-center text-white text-sm">
                      🚪
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">Logout</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= SETTINGS SECTIONS ================= */}
        <div className="space-y-8 animate-fadeIn">
          {/* ================= PROFILE SECTION ================= */}
          <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#73986F] to-[#426E55] flex items-center justify-center text-white text-xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                  Profil Pengguna
                </h2>
                <p className="text-[#73986F] mt-1 font-medium">Kelola informasi akun Anda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#2D4839] mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839] focus:scale-[1.02]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D4839] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839] focus:scale-[1.02]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email"
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-[#426E55] to-[#2D4839] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Simpan Perubahan Profil
            </button>
          </div>

          {/* ================= PASSWORD SECTION ================= */}
          <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CB748E] to-[#D698AB] flex items-center justify-center text-white text-xl">
                🔐
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                  Ganti Password
                </h2>
                <p className="text-[#73986F] mt-1 font-medium">Perbarui kata sandi akun Anda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#2D4839] mb-2">Password Lama</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839] focus:scale-[1.02]"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2D4839] mb-2">Password Baru</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839] focus:scale-[1.02]"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              className="bg-gradient-to-r from-[#73986F] to-[#426E55] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Update Password
            </button>
          </div>

          {/* ================= LANGUAGE SECTION ================= */}
          <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D6B85A] to-[#E8CA6A] flex items-center justify-center text-white text-xl">
                🌐
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                  Bahasa & Regional
                </h2>
                <p className="text-[#73986F] mt-1 font-medium">Atur preferensi bahasa aplikasi</p>
              </div>
            </div>

            <div className="mb-6 max-w-md">
              <label className="block text-sm font-medium text-[#2D4839] mb-2">Pilih Bahasa</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839] focus:scale-[1.02]"
              >
                <option value="id" className="text-[#2D4839]">🇮🇩 Bahasa Indonesia</option>
                <option value="en" className="text-[#2D4839]">🇺🇸 English</option>
                <option value="es" className="text-[#2D4839]">🇪🇸 Español</option>
                <option value="fr" className="text-[#2D4839]">🇫🇷 Français</option>
                <option value="de" className="text-[#2D4839]">🇩🇪 Deutsch</option>
                <option value="ar" className="text-[#2D4839]">🇸🇦 العربية</option>
                <option value="zh" className="text-[#2D4839]">🇨🇳 中文</option>
                <option value="ja" className="text-[#2D4839]">🇯🇵 日本語</option>
                <option value="ru" className="text-[#2D4839]">🇷🇺 Русский</option>
                <option value="pt" className="text-[#2D4839]">🇧🇷 Português</option>
              </select>
            </div>

            <div className="bg-gradient-to-r from-[#EED4DB]/20 to-[#D698AB]/20 p-4 rounded-xl border border-[#D698AB]/20">
              <p className="text-[#CB748E] text-sm font-medium">
                ℹ️ Bahasa masih simulasi (bisa dihubungkan ke i18n / next-intl).
              </p>
            </div>
          </div>

          {/* ================= RESET SECTION ================= */}
          <div className="bg-gradient-to-br from-[#CB748E]/10 to-[#D698AB]/10 p-8 rounded-3xl shadow-xl border border-[#CB748E]/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CB748E] to-[#D698AB] flex items-center justify-center text-white text-xl">
                ⚠️
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#CB748E] to-[#D698AB] bg-clip-text text-transparent">
                  Reset Data
                </h2>
                <p className="text-[#CB748E] mt-1 font-medium">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-[#CB748E]/20 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CB748E]/20 to-[#D698AB]/20 flex items-center justify-center text-[#CB748E]">
                  ❗
                </div>
                <div>
                  <h3 className="font-bold text-[#CB748E] mb-2">Peringatan</h3>
                  <p className="text-[#CB748E]/90">
                    Semua transaksi, anggaran, dan laporan akan dihapus permanen.
                    Tindakan ini akan menghapus semua data keuangan Anda dan tidak dapat dikembalikan.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleResetData}
              className="bg-gradient-to-r from-[#CB748E] to-[#D698AB] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Reset Semua Data Keuangan
            </button>
          </div>
        </div>
      </div>

      {/* ================= CUSTOM CSS ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
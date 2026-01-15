"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ================= TYPES ================= */
type Budget = {
  id: string;
  category: string;
  limit: number;
  used: number;
};

/* ================= COMPONENT ================= */
export default function AnggaranPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function fetchBudget() {
      try {
        const res = await fetch("http://localhost:3000/api/budget");
        if (res.ok) {
          const data = await res.json();
          setBudgets(data);
        }
      } catch (err) {
        console.error("Gagal mengambil data anggaran:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBudget();
  }, []);

  /* ================= HANDLERS ================= */
  const handleAddBudget = async () => {
    if (!category || !limit) {
      alert("Lengkapi semua data");
      return;
    }

    const newBudget: Budget = {
      id: crypto.randomUUID(),
      category,
      limit: Number(limit),
      used: 0,
    };

    try {
      const res = await fetch("http://localhost:3000/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      });

      if (res.ok) {
        setBudgets((prev) => [...prev, newBudget]);
        setCategory("");
        setLimit("");
      }
    } catch (err) {
      console.error("Gagal menambah anggaran:", err);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  /* ================= RENDER ================= */
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
              Manajemen Anggaran
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

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-[#73986F]/20 border-t-[#73986F] rounded-full animate-spin-slow" />
          </div>
        ) : (
          <>
            {/* ================= FORM SECTION ================= */}
            <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 mb-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                    Tambah Anggaran
                  </h2>
                  <p className="text-[#73986F] mt-1 font-medium">Atur batas anggaran untuk setiap kategori</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D4839] mb-2">Kategori</label>
                  <input
                    placeholder="Contoh: Makanan, Transportasi, Hiburan"
                    className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839] focus:scale-[1.02]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D4839] mb-2">Batas Anggaran (Rp)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839] text-lg font-bold focus:scale-[1.02]"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D4839] mb-2">&nbsp;</label>
                  <button
                    onClick={handleAddBudget}
                    className="w-full bg-gradient-to-r from-[#426E55] to-[#2D4839] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">+</span>
                    <span>Tambah Anggaran</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ================= BUDGET LIST ================= */}
            <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                    Daftar Anggaran
                  </h2>
                  <p className="text-[#73986F] mt-1 font-medium">
                    {budgets.length} anggaran aktif
                  </p>
                </div>
              </div>

              {budgets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EED4DB] to-[#D698AB] flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-3xl">📊</span>
                  </div>
                  <p className="text-[#73986F] text-lg font-medium">Belum ada anggaran</p>
                  <p className="text-[#D698AB] mt-1 font-medium">Mulai dengan menambahkan anggaran pertama Anda</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {budgets.map((b, index) => {
                    const percent = Math.round((b.used / b.limit) * 100);
                    const remaining = b.limit - b.used;

                    return (
                      <div 
                        key={b.id} 
                        className="bg-white p-6 rounded-2xl shadow-lg border border-[#73986F]/10 hover:shadow-xl transition-all duration-300 animate-slideInUp hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              percent >= 90
                                ? "bg-gradient-to-br from-[#CB748E]/20 to-[#D698AB]/20"
                                : percent >= 60
                                ? "bg-gradient-to-br from-[#D6B85A]/20 to-[#E8CA6A]/20"
                                : "bg-gradient-to-br from-[#73986F]/20 to-[#8AB388]/20"
                            }`}>
                              <span className="text-2xl">
                                {percent >= 90 ? "⚠️" : percent >= 60 ? "📊" : "✅"}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-[#2D4839]">{b.category}</h3>
                              <p className="text-sm text-[#73986F]">
                                Sisa anggaran: Rp {remaining.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#2D4839]">
                              Rp {b.used.toLocaleString()} / Rp {b.limit.toLocaleString()}
                            </p>
                            <p className={`text-sm font-medium ${
                              percent >= 90
                                ? "text-[#CB748E]"
                                : percent >= 60
                                ? "text-[#D6B85A]"
                                : "text-[#73986F]"
                            }`}>
                              Terpakai {percent}%
                            </p>
                          </div>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="w-full bg-gradient-to-r from-transparent via-[#73986F]/10 to-transparent h-2 rounded-full mb-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              percent >= 90
                                ? "bg-gradient-to-r from-[#CB748E] to-[#D698AB]"
                                : percent >= 60
                                ? "bg-gradient-to-r from-[#D6B85A] to-[#E8CA6A]"
                                : "bg-gradient-to-r from-[#73986F] to-[#8AB388]"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="flex justify-between text-sm text-[#73986F]">
                          <span>Rp 0</span>
                          <span>Rp {b.limit.toLocaleString()}</span>
                        </div>

                        <div className={`mt-4 px-4 py-2 rounded-lg text-center text-sm font-medium ${
                          percent >= 90
                            ? "bg-gradient-to-r from-[#CB748E]/10 to-[#D698AB]/10 text-[#CB748E] border border-[#CB748E]/20"
                            : percent >= 60
                            ? "bg-gradient-to-r from-[#D6B85A]/10 to-[#E8CA6A]/10 text-[#D6B85A] border border-[#D6B85A]/20"
                            : "bg-gradient-to-r from-[#73986F]/10 to-[#8AB388]/10 text-[#73986F] border border-[#73986F]/20"
                        }`}>
                          {percent >= 90
                            ? "⚠️ Anggaran hampir habis"
                            : percent >= 60
                            ? "📊 Anggaran sedang digunakan"
                            : "✅ Anggaran aman"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
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
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
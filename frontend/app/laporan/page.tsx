"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as XLSX from "xlsx";

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

export default function LaporanPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/transactions");
        const data = await res.json();
        setTransactions(data);
        setFiltered(data);
      } catch (err) {
        console.error("Gagal mengambil data transaksi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ================= FILTER ================= */
  const applyFilter = () => {
    let data = [...transactions];
    if (startDate) data = data.filter((t) => t.date >= startDate);
    if (endDate) data = data.filter((t) => t.date <= endDate);
    setFiltered(data);
  };

  /* ================= EXPORT EXCEL ================= */
  const exportToExcel = () => {
    if (filtered.length === 0) {
      alert("Tidak ada data untuk diexport");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      filtered.map((t) => ({
        Tanggal: t.date,
        Jenis: t.type === "income" ? "Pendapatan" : "Pengeluaran",
        Kategori: t.category,
        Nominal: t.amount,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
    XLSX.writeFile(workbook, "laporan-keuangan.xlsx");
  };

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

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
              Laporan Keuangan
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
            {/* ================= SUMMARY CARDS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/95 p-6 rounded-2xl shadow-lg border border-[#73986F]/10 hover:shadow-2xl transition-all duration-300 animate-slideInUp" style={{ animationDelay: "0ms" }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#73986F]/20 to-[#8AB388]/20 flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <p className="text-[#73986F] text-sm font-medium mb-1">Total Pendapatan</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#73986F] to-[#8AB388] bg-clip-text text-transparent">
                      Rp {totalIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 p-6 rounded-2xl shadow-lg border border-[#CB748E]/10 hover:shadow-2xl transition-all duration-300 animate-slideInUp" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CB748E]/20 to-[#D698AB]/20 flex items-center justify-center">
                    <span className="text-2xl">📉</span>
                  </div>
                  <div>
                    <p className="text-[#CB748E] text-sm font-medium mb-1">Total Pengeluaran</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#CB748E] to-[#D698AB] bg-clip-text text-transparent">
                      Rp {totalExpense.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 p-6 rounded-2xl shadow-lg border border-[#426E55]/10 hover:shadow-2xl transition-all duration-300 animate-slideInUp" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#426E55]/20 to-[#73986F]/20 flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <p className="text-[#426E55] text-sm font-medium mb-1">Saldo Akhir</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#426E55] to-[#73986F] bg-clip-text text-transparent">
                      Rp {(totalIncome - totalExpense).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= FILTER SECTION ================= */}
            <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 mb-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                    Filter Laporan
                  </h2>
                  <p className="text-[#73986F] mt-1 font-medium">Sesuaikan periode laporan keuangan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D4839] mb-2">Dari Tanggal</label>
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D4839] mb-2">Sampai Tanggal</label>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-[#2D4839]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D4839] mb-2">&nbsp;</label>
                  <button 
                    onClick={applyFilter} 
                    className="w-full bg-gradient-to-r from-[#426E55] to-[#2D4839] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  >
                    Terapkan Filter
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D4839] mb-2">&nbsp;</label>
                  <button 
                    onClick={exportToExcel} 
                    className="w-full bg-gradient-to-r from-[#73986F] to-[#426E55] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>📊</span>
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ================= TABLE SECTION ================= */}
            <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                    Data Transaksi
                  </h2>
                  <p className="text-[#73986F] mt-1 font-medium">
                    {filtered.length} transaksi ditemukan
                  </p>
                </div>
              </div>

              {/* ================= TRANSACTION TABLE ================= */}
              <div className="overflow-x-auto rounded-2xl border border-[#73986F]/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#73986F]/5 to-[#426E55]/5">
                      <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Tanggal</th>
                      <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Jenis</th>
                      <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Kategori</th>
                      <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center p-8">
                          <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EED4DB] to-[#D698AB] flex items-center justify-center mb-4 shadow-lg">
                              <span className="text-3xl">📊</span>
                            </div>
                            <p className="text-[#73986F] text-lg font-medium">Tidak ada data transaksi</p>
                            <p className="text-[#D698AB] mt-1 font-medium">Coba gunakan filter yang berbeda</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((t, index) => (
                        <tr
                          key={t.id}
                          className="border-b border-[#73986F]/5 hover:bg-[#73986F]/5 transition-colors duration-300"
                        >
                          <td className="p-4 font-medium">{t.date}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                              t.type === "income" 
                                ? "bg-gradient-to-r from-[#73986F]/15 to-[#8AB388]/15 text-[#426E55] border border-[#73986F]/20" 
                                : "bg-gradient-to-r from-[#CB748E]/15 to-[#D698AB]/15 text-[#CB748E] border border-[#CB748E]/20"
                            }`}>
                              {t.type === "income" ? "📈" : "📉"}
                              {t.type === "income" ? "Pendapatan" : "Pengeluaran"}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-[#2D4839]">{t.category}</td>
                          <td className="p-4 font-bold text-lg">
                            <span className={t.type === "income" ? "text-[#426E55]" : "text-[#CB748E]"}>
                              {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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
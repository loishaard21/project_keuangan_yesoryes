"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* ================= TYPES ================= */
type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

/* ================= COMPONENT ================= */
export default function TransaksiPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
  });

  /* ================= HANDLERS ================= */
  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleAddTransaction = () => {
    const amount = Number(form.amount);
    if (!form.category || isNaN(amount)) return;

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type: form.type as "income" | "expense",
      category: form.category,
      amount,
      date: new Date().toISOString().split("T")[0],
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setForm({ type: "income", category: "", amount: "" });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

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
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#2D4839] to-[#426E55] text-white p-6 z-50 shadow-2xl transform transition-all duration-500 ease-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden ${pathname === item.path
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
              Manajemen Transaksi
            </h1>
          </div>

          {/* PROFILE MENU */}
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

        {/* ================= TABLE ================= */}
        <div
          className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 animate-fadeIn"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                Daftar Transaksi
              </h2>
              <p className="text-[#73986F] mt-1 font-medium">Kelola semua transaksi keuangan Anda</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-[#426E55] to-[#2D4839] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              <span className={`text-xl transition-transform ${showModal ? "rotate-45" : ""}`}>
                +
              </span>
              <span>Tambah Transaksi</span>
            </button>
          </div>

          {/* ================= TRANSACTION TABLE ================= */}
          <div className="overflow-x-auto rounded-2xl border border-[#73986F]/10">  
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Tanggal</th>
                  <th className="border p-2">Jenis</th>
                  <th className="border p-2">Kategori</th>
                  <th className="border p-2">Nominal</th>
                  <th className="border p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      Belum ada transaksi
                    </td>
                  </tr>
                )}

                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="border p-2">{t.date}</td>
                    <td className="border p-2">
                      {t.type === "income" ? "Pendapatan" : "Pengeluaran"}
                    </td>
                    <td className="border p-2">{t.category}</td>
                    <td className="border p-2">
                      Rp {t.amount.toLocaleString()}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>    
        </div>

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Tambah Transaksi</h2>

              <select
                value={form.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="income">Pendapatan</option>
                <option value="expense">Pengeluaran</option>
              </select>

              <input
                value={form.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="Kategori"
                className="w-full border p-2 rounded mb-3"
              />

              <input
                value={form.amount}
                onChange={(e) =>
                  handleInputChange("amount", e.target.value.replace(/\D/g, ""))
                }
                placeholder="Nominal"
                className="w-full border p-2 rounded mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddTransaction}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

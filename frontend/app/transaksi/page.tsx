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
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#2D4839] to-[#426E55] text-white p-6 z-50 shadow-2xl transform transition-all duration-500 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-lg">CERDAS FINANSIAL</h1>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="flex flex-col space-y-4 text-gray-300">
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Transaksi", path: "/transaksi" },
            { label: "Laporan", path: "/laporan" },
            { label: "Anggaran", path: "/anggaran" },
            { label: "Pengaturan", path: "/pengaturan" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setSidebarOpen(false)}
              className={
                pathname === item.path
                  ? "text-white font-semibold"
                  : "hover:text-white"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="p-6">

        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* HAMBURGER BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-white rounded-md shadow border"
            >
              <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
            </button>

            <h1 className="text-3xl font-bold">Manajemen Transaksi</h1>
          </div>

          {/* PROFILE MENU */}
          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border"
            >
              <img
                src="https://i.pravatar.cc/40"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">Akun</span>
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                <Link href="/pengaturan" className="block px-4 py-2 hover:bg-gray-100">
                  Profil Saya
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Daftar Transaksi</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Tambah Transaksi
            </button>
          </div>

          <table className="w-full border">
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

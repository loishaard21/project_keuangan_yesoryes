"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* ================= TYPES ================= */
type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

/* ================= COMPONENT ================= */
export default function FinanceDashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

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
    alert("Berhasil logout");
    router.push("/login");
  };

  /* ================= CALCULATIONS ================= */
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-60 bg-gray-900 text-white p-6">
        <h1 className="text-lg font-bold mb-6">CERDAS FINANSIAL</h1>

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
      <div className="flex-1 p-6">

        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Keuangan</h1>

          {/* === PROFILE MENU (FIXED & CLEAN) === */}
          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                Akun
              </span>
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg overflow-hidden">
                <Link
                  href="/profil"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profil Saya
                </Link>
                <Link
                  href="/pengaturan"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Pengaturan
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

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard title="Saldo" value={balance} color="text-green-600" />
          <SummaryCard title="Total Pendapatan" value={totalIncome} color="text-blue-600" />
          <SummaryCard title="Total Pengeluaran" value={totalExpense} color="text-red-600" />
        </div>


        {/* ================= TRANSACTIONS ================= */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between mb-4">
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
                  <td className="border p-2">{t.type}</td>
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
          <Modal
            form={form}
            onChange={handleInputChange}
            onClose={() => setShowModal(false)}
            onSave={handleAddTransaction}
          />
        )}
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>
        Rp {value.toLocaleString()}
      </p>
    </div>
  );
}

function Modal({
  form,
  onChange,
  onClose,
  onSave,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tambah Transaksi</h2>

        <select
          value={form.type}
          onChange={(e) => onChange("type", e.target.value)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="income">Pendapatan</option>
          <option value="expense">Pengeluaran</option>
        </select>

        <input
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
          placeholder="Kategori"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          value={form.amount}
          onChange={(e) => onChange("amount", e.target.value.replace(/\D/g, ""))}
          placeholder="Nominal"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Batal
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= TYPES ================= */
type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

/* ================= MAIN COMPONENT ================= */
export default function FinanceDashboard() {
  const router = useRouter();
  const pathname = usePathname();

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

  /* ================= CALCULATION ================= */
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: "Pendapatan", value: totalIncome },
    { name: "Pengeluaran", value: totalExpense },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-[#EED4DB] text-[#2D4839]">

      {/* ================= OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#2D4839]/60 z-40 backdrop-blur-sm"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#2D4839] text-[#EED4DB] p-6 z-50
        transform transition-transform duration-300 shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-10 border-b border-[#73986F]/30 pb-4">
          <h1 className="font-extrabold text-xl tracking-wide">CERDAS FINANSIAL</h1>
          <button onClick={() => setSidebarOpen(false)} className="text-[#D698AB] hover:text-white transition">✕</button>
        </div>

        <nav className="flex flex-col space-y-2">
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
              className={`px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === item.path
                  ? "bg-[#426E55] text-white font-bold shadow-lg" // Active state: Grounding green
                  : "text-[#D698AB] hover:bg-[#426E55]/30 hover:text-white" // Inactive
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="p-6 lg:ml-0 transition-all">

        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-4">
            {/* HAMBURGER */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-white/50 hover:bg-white rounded-xl shadow-sm border border-[#D698AB] transition"
            >
              <span className="block w-6 h-0.5 bg-[#2D4839] mb-1"></span>
              <span className="block w-6 h-0.5 bg-[#2D4839] mb-1"></span>
              <span className="block w-6 h-0.5 bg-[#2D4839]"></span>
            </button>

            <h1 className="text-3xl font-extrabold text-[#2D4839]">Dashboard Keuangan</h1>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-md border border-[#D698AB] hover:shadow-lg transition"
            >
              <img
                src="https://i.pravatar.cc/40"
                className="w-8 h-8 rounded-full border border-[#CB748E]"
              />
              <span className="text-sm font-bold text-[#2D4839]">Akun</span>
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#D698AB] overflow-hidden z-30">
                <Link href="/profil" className="block px-4 py-3 text-[#2D4839] hover:bg-[#EED4DB] transition">
                  Profil Saya
                </Link>
                <Link href="/pengaturan" className="block px-4 py-3 text-[#2D4839] hover:bg-[#EED4DB] transition">
                  Pengaturan
                </Link>
                <div className="h-px bg-gray-100 mx-2"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-[#CB748E] font-bold hover:bg-[#fff0f3] transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Summary title="Saldo" value={balance} color="text-[#426E55]" />
          <Summary title="Pendapatan" value={totalIncome} color="text-[#73986F]" />
          <Summary title="Pengeluaran" value={totalExpense} color="text-[#CB748E]" />
        </div>

        {/* ================= CHART ================= */}
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#D698AB]/30 mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#2D4839]">Ringkasan Grafik</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={90} paddingAngle={5} label>
                  <Cell fill="#73986F" stroke="none" /> 
                  <Cell fill="#CB748E" stroke="none" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= TRANSACTION TABLE ================= */}
        <div className="bg-white p-6 rounded-lg shadow">
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
                  <td className="border p-2">Rp {t.amount.toLocaleString()}</td>
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
function Summary({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="font-semibold">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>
        Rp {value.toLocaleString()}
      </p>
    </div>
  );
}

function Modal({ form, onChange, onClose, onSave }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
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

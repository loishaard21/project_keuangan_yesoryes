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
  const [openProfile, setOpenProfile] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gray-100">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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

      {/* MAIN */}
      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* HAMBURGER */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-white rounded shadow border"
            >
              <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
              <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
              <span className="block w-6 h-0.5 bg-gray-800" />
            </button>

            <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border"
            >
              <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full" />
              <span>Akun</span>
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-50">
                <Link href="/profil" className="block px-4 py-2 hover:bg-gray-100">
                  Profil Saya
                </Link>
                <Link href="/pengaturan" className="block px-4 py-2 hover:bg-gray-100">
                  Pengaturan
                </Link>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RINGKASAN */}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded shadow">
              <h3>Total Pendapatan</h3>
              <p className="text-2xl font-bold text-green-600">
                Rp {totalIncome.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3>Total Pengeluaran</h3>
              <p className="text-2xl font-bold text-red-600">
                Rp {totalExpense.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3>Saldo Akhir</h3>
              <p className="text-2xl font-bold text-blue-600">
                Rp {(totalIncome - totalExpense).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* FILTER */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded" />
            <button onClick={applyFilter} className="bg-blue-600 text-white rounded">
              Terapkan Filter
            </button>
            <button onClick={exportToExcel} className="bg-green-600 text-white rounded">
              Export Excel
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Tanggal</th>
                <th className="border p-2">Jenis</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Nominal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="border p-2">{t.date}</td>
                  <td className="border p-2">
                    {t.type === "income" ? "Pendapatan" : "Pengeluaran"}
                  </td>
                  <td className="border p-2">{t.category}</td>
                  <td className="border p-2">
                    Rp {t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

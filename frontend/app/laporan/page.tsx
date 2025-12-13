"use client";

import React, { useEffect, useState } from "react";

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

export default function LaporanPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATE
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openProfile, setOpenProfile] = useState(false); // dropdown profil

  // AMBIL DATA DARI API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/transactions", {
          method: "GET",
        });

        const data = await res.json();
        setTransactions(data);
        setFiltered(data); // default tanpa filter
      } catch (err) {
        console.error("Gagal mengambil data transaksi:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // FUNGSI FILTER
  const applyFilter = () => {
    let data = [...transactions];

    if (startDate) {
      data = data.filter((t) => t.date >= startDate);
    }

    if (endDate) {
      data = data.filter((t) => t.date <= endDate);
    }

    setFiltered(data);
  };

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-wide mb-4">KeuanganKu</h1>

        <nav className="flex flex-col space-y-4 text-gray-300">
          <a href="/dashboard" className="hover:text-white cursor-pointer">
            Dashboard
          </a>
          <a href="/transaksi" className="hover:text-white cursor-pointer">
            Transaksi
          </a>
          <a href="/laporan" className="font-semibold text-white cursor-pointer">
            Laporan
          </a>
          <a href="/anggaran" className="hover:text-white cursor-pointer">
            Anggaran
          </a>
          <a href="/pengaturan" className="hover:text-white cursor-pointer">
            Pengaturan
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER BAR + PROFIL */}
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Laporan Keuangan</h1>

          {/* PROFIL */}
          <div className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow cursor-pointer"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-700">Akun</span>
            </button>

            {openProfile && (
              <div className="absolute right-0 w-48 bg-white shadow-lg rounded-lg mt-2 border">
                <a
                  href="/profil"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profil
                </a>
                <a
                  href="/pengaturan"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Pengaturan
                </a>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {loading && <p className="text-gray-600">Memuat data...</p>}

        {/* RINGKASAN */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-gray-600">Total Pendapatan</h3>
              <p className="text-2xl font-bold text-green-600">
                Rp {totalIncome.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-gray-600">Total Pengeluaran</h3>
              <p className="text-2xl font-bold text-red-600">
                Rp {totalExpense.toLocaleString()}
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-gray-600">Saldo Akhir</h3>
              <p className="text-2xl font-bold text-blue-600">
                Rp {(totalIncome - totalExpense).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* FILTER */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Rentang Tanggal</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Tanggal Mulai</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Tanggal Akhir</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={applyFilter}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>

        {/* TABEL */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Detail Transaksi</h2>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Tanggal</th>
                <th className="p-2 border">Jenis</th>
                <th className="p-2 border">Kategori</th>
                <th className="p-2 border">Nominal</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                filtered.length > 0 &&
                filtered.map((t) => (
                  <tr key={t.id}>
                    <td className="p-2 border">{t.date}</td>
                    <td className="p-2 border">
                      {t.type === "income" ? "Pendapatan" : "Pengeluaran"}
                    </td>
                    <td className="p-2 border">{t.category}</td>
                    <td className="p-2 border">Rp {t.amount.toLocaleString()}</td>
                  </tr>
                ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Tidak ada transaksi pada rentang tanggal ini
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
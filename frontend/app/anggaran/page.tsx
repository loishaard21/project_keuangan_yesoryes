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

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

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
    alert("Berhasil logout");
    router.push("/login");
  };

  /* ================= RENDER ================= */
  return (
    <div className="flex min-h-screen bg-gray-100 relative">

      {/* ================= OVERLAY ================= */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-gray-900 text-white p-6 z-40
        transform transition-transform duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h1 className="text-lg font-bold mb-8">CERDAS FINANSIAL</h1>

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
              onClick={() => setOpenSidebar(false)}
              className={`${
                pathname === item.path
                  ? "text-white font-semibold"
                  : "hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6 relative z-10">

        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-6">

          {/* HAMBURGER */}
          <button
            onClick={() => setOpenSidebar(true)}
            className="p-2 rounded bg-white shadow border"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-800" />
              <span className="block w-6 h-0.5 bg-gray-800" />
              <span className="block w-6 h-0.5 bg-gray-800" />
            </div>
          </button>

          <h1 className="text-3xl font-bold">Manajemen Anggaran</h1>

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
                <Link href="/profil" className="block px-4 py-2 hover:bg-gray-100">
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

        {/* ================= FORM ================= */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Tambah Anggaran</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Kategori"
              className="border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="number"
              placeholder="Batas Anggaran (Rp)"
              className="border p-2 rounded"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
            <button
              onClick={handleAddBudget}
              className="bg-blue-600 text-white rounded"
            >
              Tambah
            </button>
          </div>
        </div>

        {/* ================= LIST ================= */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Daftar Anggaran</h2>

          {loading && <p>Memuat data...</p>}
          {!loading && budgets.length === 0 && (
            <p className="text-gray-500">Belum ada anggaran.</p>
          )}

          <div className="space-y-4">
            {budgets.map((b) => {
              const percent = Math.round((b.used / b.limit) * 100);

              return (
                <div key={b.id} className="border p-4 rounded bg-gray-50">
                  <div className="flex justify-between font-semibold mb-2">
                    <span>{b.category}</span>
                    <span>
                      Rp {b.used.toLocaleString()} / Rp{" "}
                      {b.limit.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full bg-gray-300 h-3 rounded">
                    <div
                      className={`h-3 rounded ${
                        percent >= 90
                          ? "bg-red-600"
                          : percent >= 60
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <p className="text-sm mt-2 text-gray-600">
                    Terpakai {percent}% dari anggaran
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function PengaturanPage() {
  const pathname = usePathname();
  const router = useRouter();

  const [name, setName] = useState("Nama Pengguna");
  const [email, setEmail] = useState("email@example.com");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [theme, setTheme] = useState("light");

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
    alert("Logout berhasil");
    router.push("/login");
  };

  const menu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Transaksi", path: "/transaksi" },
    { label: "Laporan", path: "/laporan" },
    { label: "Anggaran", path: "/anggaran" },
    { label: "Pengaturan", path: "/pengaturan" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-60 bg-gray-900 text-white p-6">
        <h1 className="text-lg font-bold mb-8">CERDAS FINANSIAL</h1>

        <nav className="flex flex-col space-y-4 text-gray-300">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-2 rounded transition ${
                pathname === item.path
                  ? "bg-gray-800 text-white font-semibold"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 text-left text-red-400 hover:text-red-500"
        >
          Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Pengaturan</h1>

        <div className="space-y-10">

          {/* PROFIL */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Profil Pengguna</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Nama</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </section>

          {/* PASSWORD */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Ganti Password</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Password Lama"
                className="border p-2 rounded"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password Baru"
                className="border p-2 rounded"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>

            <button
              onClick={handleChangePassword}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Password
            </button>
          </section>

          {/* TEMA */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Tampilan</h2>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>

            <p className="text-gray-600 mt-2 text-sm">
              Tema masih simulasi (bisa dihubungkan ke localStorage).
            </p>
          </section>

          {/* RESET */}
          <section className="bg-white p-6 rounded-lg shadow border border-red-200">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Reset Data
            </h2>

            <p className="text-gray-600 mb-4">
              Semua transaksi, anggaran, dan laporan akan dihapus permanen.
            </p>

            <button
              onClick={handleResetData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reset Semua Data
            </button>
          </section>

        </div>
      </main>
    </div>
  );
}

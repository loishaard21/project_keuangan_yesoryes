"use client";

import React, { useState } from "react";

export default function PengaturanPage() {
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
      return alert("Isi semua kolom password");
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

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-wide mb-4">KeuanganKu</h1>

        <nav className="flex flex-col space-y-4 text-gray-300">
          <a href="/dashboard" className="hover:text-white">
            Dashboard
          </a>
          <a href="/transaksi" className="hover:text-white">
            Transaksi
          </a>
          <a href="/laporan" className="hover:text-white">
            Laporan
          </a>
          <a href="/anggaran" className="hover:text-white">
            Anggaran
          </a>
          <a href="/pengaturan" className="font-semibold text-white">
            Pengaturan
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Pengaturan</h1>

        <div className="space-y-10">

          {/* PENGATURAN PROFIL */}
          <section className="bg-white p-6 rounded shadow">
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

          {/* GANTI PASSWORD */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Ganti Password</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Password Lama</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-600">Password Baru</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Password
            </button>
          </section>

          {/* TEMA */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Tampilan (Tema)</h2>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>

            <p className="text-gray-600 mt-2">
              Tema tidak permanen, hanya simulasi (bisa disambungkan dengan localStorage jika diperlukan).
            </p>
          </section>

          {/* RESET DATA */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Reset Data</h2>

            <p className="text-gray-600 mb-4">
              Menghapus semua transaksi, anggaran, dan data laporan secara permanen.
            </p>

            <button
              onClick={handleResetData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reset Semua Data
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}

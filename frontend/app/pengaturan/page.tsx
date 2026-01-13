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
  const [language, setLanguage] = useState("id");
  const [accentColor, setAccentColor] = useState("#2563eb"); // default blue

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

      {/* SIDEBAR */}
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

      {/* MAIN */}
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
              style={{ backgroundColor: accentColor }}
              className="mt-4 text-white px-4 py-2 rounded"
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

          {/* BAHASA */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Bahasa & Regional</h2>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border p-2 rounded w-full md:w-1/2"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ar">العربية</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ru">Русский</option>
              <option value="pt">Português</option>
            </select>

            <p className="text-sm text-gray-600 mt-2">
              Bahasa masih simulasi (bisa dihubungkan ke i18n / next-intl).
            </p>
          </section>

          {/* WARNA */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Warna Tema</h2>

            <div className="flex items-center gap-4">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-16 h-10"
              />

              <span className="text-gray-600">
                Warna utama aplikasi
              </span>
            </div>

            <div className="mt-4">
              <button
                style={{ backgroundColor: accentColor }}
                className="text-white px-4 py-2 rounded"
              >
                Contoh Tombol
              </button>
            </div>
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

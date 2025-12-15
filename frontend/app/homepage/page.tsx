"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ================= NAVBAR ================= */}
      <header className="flex justify-between items-center px-10 py-6 border-b">
        <h1 className="text-2xl font-bold text-blue-700">
          Cerdas Finansial
        </h1>

        <nav className="space-x-6 text-gray-600 font-medium">
          <Link href="#fitur" className="hover:text-blue-600">Fitur</Link>
          <Link href="#manfaat" className="hover:text-blue-600">Manfaat</Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-20 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            Kelola Keuangan Lebih Mudah <br />
            Tanpa Ribet & Manual
          </h2>

          <p className="text-gray-600 mb-8">
            Website Cerdas Finansial merupakan aplikasi pengelolaan keuangan berbasis web yang dirancang untuk membantu pengguna mencatat, 
            mengontrol, dan menganalisis kondisi keuangan secara mudah dan terstruktur. Melalui fitur pencatatan transaksi, 
            pengelolaan anggaran, serta laporan keuangan otomatis, website ini memungkinkan pengguna memantau pemasukan dan pengeluaran secara real-time, 
            mengurangi risiko kesalahan pencatatan manual, serta mendukung pengambilan keputusan finansial yang lebih tepat dan efisien.
          </p>

          <Link
            href="/registrasi"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Mulai Sekarang →
          </Link>
        </div>

        <div className="flex justify-center">
          <img
            src="https://dummyimage.com/600x400/e5e7eb/374151&text=Dashboard+Keuangan"
            alt="Dashboard"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* ================= MANFAAT ================= */}
      <section id="manfaat" className="bg-gray-50 py-20 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">
          Kenapa Harus Pakai Cerdas Finansial?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Pencatatan Manual Rawan Salah",
              desc: "Tanpa sistem otomatis, kesalahan pencatatan sering terjadi dan menyulitkan evaluasi keuangan."
            },
            {
              title: "Laporan Keuangan Tidak Terstruktur",
              desc: "Data tersebar membuat laporan sulit dibaca dan tidak akurat."
            },
            {
              title: "Sulit Mengontrol Pengeluaran",
              desc: "Tanpa anggaran yang jelas, pengeluaran sering melebihi batas."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h4 className="font-semibold text-lg mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section id="fitur" className="py-20 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">
          Fitur Unggulan
        </h3>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              title: "Dashboard Keuangan",
              desc: "Ringkasan saldo, pemasukan, dan pengeluaran secara real-time."
            },
            {
              title: "Manajemen Transaksi",
              desc: "Catat pemasukan dan pengeluaran dengan mudah."
            },
            {
              title: "Anggaran (Budgeting)",
              desc: "Atur batas pengeluaran untuk setiap kategori."
            },
            {
              title: "Laporan Keuangan",
              desc: "Laporan bulanan & tahunan dalam bentuk ringkas."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="border p-6 rounded-xl hover:shadow-md transition"
            >
              <h4 className="font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h3 className="text-3xl font-bold mb-4">
          Siap Mengelola Keuangan Lebih Baik?
        </h3>
        <p className="mb-8">
          Mulai gunakan Cerdas Finansial sekarang dan rasakan kemudahannya.
        </p>
        <Link
          href="/registrasi"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
        >
          Daftar Gratis
        </Link>
      </section>

    </main>
  );
}

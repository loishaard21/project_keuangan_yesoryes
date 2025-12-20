"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F9] text-[#426E55] selection:bg-[#CB748E] selection:text-white font-sans antialiased">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-10 py-6 border-b border-[#EED4DB]/50 bg-white/70 backdrop-blur-md transition-all">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#CB748E] to-[#D698AB] bg-clip-text text-transparent">
          Cerdas Finansial
        </h1>

        <nav className="space-x-6 text-[#426E55] font-medium">
          <Link href="#fitur" className="hover:text-[#CB748E] transition-colors duration-300">
            Fitur
          </Link>
          <Link href="#manfaat" className="hover:text-[#CB748E] transition-colors duration-300">
            Manfaat
          </Link>
          <Link href="/login"
            className="group relative px-5 py-2 rounded-full overflow-hidden bg-[#426E55] text-white shadow-lg shadow-[#426E55]/30 hover:shadow-[#426E55]/50 transition-all duration-300">
            <span className="relative z-10 group-hover:tracking-wider transition-all">Login</span>
            {/* Animasi background saat hover */}
            <div
              className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-[#2D4839]/20">
            </div>
          </Link>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 gap-12 px-10 py-24 items-center bg-gradient-to-br from-white via-[#FDF8F9] to-[#EED4DB]/40">
        <div>
          <h2 className="text-5xl font-extrabold text-[#2D4839] leading-tight mb-6 tracking-tight">
            Kelola Keuangan <span className="text-[#CB748E]">Lebih Mudah</span> <br />
            Tanpa Ribet & Manual
          </h2>

          <p className="text-[#426E55] text-lg mb-8 leading-relaxed max-w-lg">
            Cerdas Finansial adalah aplikasi pengelolaan keuangan berbasis web
            yang membantu pengguna mencatat, mengontrol, dan menganalisis
            pemasukan serta pengeluaran secara terstruktur.
          </p>

          <Link href="/registrasi"
            className="inline-block bg-gradient-to-r from-[#CB748E] to-[#D698AB] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-[#CB748E]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#CB748E]/50 transition-all duration-300">
            Coba Sekarang →
          </Link>
        </div>

        <div className="flex justify-center relative">
          {/* Dekorasi blur di belakang gambar */}
          <div
            className="absolute -inset-4 bg-gradient-to-r from-[#CB748E] to-[#73986F] opacity-20 blur-2xl rounded-full">
          </div>
          <Image src="/images/dashboard.png" alt="Dashboard Cerdas Finansial" width={600} height={400}
            className="relative rounded-2xl shadow-2xl shadow-[#2D4839]/20 border border-white/50 transform hover:scale-[1.02] transition-transform duration-500"
            priority />
        </div>
      </section>

      {/* ================= MANFAAT ================= */}
      <section id="manfaat" className="bg-gray-50 py-20 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">
          Kenapa Harus Pakai Cerdas Finansial?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg mb-3">
              Pencatatan Lebih Akurat
            </h4>
            <p className="text-gray-600 text-sm">
              Mengurangi kesalahan pencatatan manual dengan sistem otomatis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg mb-3">
              Laporan Keuangan Jelas
            </h4>
            <p className="text-gray-600 text-sm">
              Data keuangan tersaji rapi dan mudah dipahami.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg mb-3">
              Kontrol Pengeluaran
            </h4>
            <p className="text-gray-600 text-sm">
              Atur anggaran agar pengeluaran tidak melebihi batas.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section id="fitur" className="py-20 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">
          Fitur Unggulan
        </h3>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="border p-6 rounded-xl hover:shadow-md transition">
            <h4 className="font-semibold mb-2">
              Dashboard Keuangan
            </h4>
            <p className="text-sm text-gray-600">
              Ringkasan saldo, pemasukan, dan pengeluaran real-time.
            </p>
          </div>

          <div className="border p-6 rounded-xl hover:shadow-md transition">
            <h4 className="font-semibold mb-2">
              Manajemen Transaksi
            </h4>
            <p className="text-sm text-gray-600">
              Catat transaksi dengan cepat dan mudah.
            </p>
          </div>

          <div className="border p-6 rounded-xl hover:shadow-md transition">
            <h4 className="font-semibold mb-2">
              Anggaran (Budgeting)
            </h4>
            <p className="text-sm text-gray-600">
              Atur batas pengeluaran setiap kategori.
            </p>
          </div>

          <div className="border p-6 rounded-xl hover:shadow-md transition">
            <h4 className="font-semibold mb-2">
              Laporan Keuangan
            </h4>
            <p className="text-sm text-gray-600">
              Laporan bulanan dan tahunan otomatis.
            </p>
          </div>
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
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Daftar Gratis
        </Link>
      </section>

    </main>
  );
}

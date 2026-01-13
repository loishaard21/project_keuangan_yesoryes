"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <style jsx>{`
        main {
          background: linear-gradient(135deg, #EED4DB 0%, #EED4DB 30%, #FFFFFF 100%);
          position: relative;
          overflow-x: hidden;
        }

        main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 80%, #D698AB22 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, #73986F22 0%, transparent 50%);
          z-index: 0;
          animation: float 25s infinite ease-in-out;
        }
        
       `}</style> 
    <main className="min-h-screen font-sans antialiased">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-extrabold">
          Cerdas Finansial
        </h1>

        <nav className="space-x-6 font-medium">
          <Link href="#fitur" className="transition-colors duration-300">
            Fitur
          </Link>
          <Link href="#manfaat" className="transition-colors duration-300">
            Manfaat
          </Link>
          <Link href="/login"
            className="group relative px-5 py-2 rounded-full overflow-hidden">
            <span className="relative z-10 group-hover:tracking-wider transition-all">Login</span>
            {/* Animasi background saat hover */}
            <div
              className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100">
            </div>
          </Link>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 gap-12 px-10 py-24 items-center">
        <div>
          <h2 className="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            Kelola Keuangan <span>Lebih Mudah</span> <br />
            Tanpa Ribet & Manual
          </h2>

          <p className="text-lg mb-8 leading-relaxed max-w-lg">
            Cerdas Finansial adalah aplikasi pengelolaan keuangan berbasis web
            yang membantu pengguna mencatat, mengontrol, dan menganalisis
            pemasukan serta pengeluaran secara terstruktur.
          </p>

          <Link href="/registrasi"
            className="inline-block text-white px-8 py-4 rounded-full font-bold transition-all duration-300">
            Coba Sekarang →
          </Link>
        </div>

        <div className="flex justify-center relative">
          {/* Dekorasi blur di belakang gambar */}
          <div
            className="absolute -inset-4 opacity-20 blur-2xl rounded-full">
          </div>
          <Image src="/images/dashboard.png" alt="Dashboard Cerdas Finansial" width={600} height={400}
            className="relative rounded-2xl border transform hover:scale-[1.02] transition-transform duration-500"
            priority />
        </div>
      </section>

      {/* ================= MANFAAT ================= */}
      <section id="manfaat" className="py-24 px-10 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2">
        </div>

        <h3 className="text-3xl font-bold text-center mb-16">
          Kenapa Harus Pakai <span className="border-b-4">Cerdas Finansial?</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          <div
            className="p-8 rounded-2xl border transition-all duration-300 group">
            <h4 className="font-bold text-xl mb-3 transition-colors">
              Pencatatan Lebih Akurat
            </h4>
            <p className="text-sm leading-relaxed">
              Mengurangi kesalahan pencatatan manual dengan sistem otomatis yang terintegrasi.
            </p>
          </div>

          <div
            className="p-8 rounded-2xl border transition-all duration-300 group">
            <h4 className="font-bold text-xl mb-3 transition-colors">
              Laporan Keuangan Jelas
            </h4>
            <p className="text-sm leading-relaxed">
              Data keuangan tersaji rapi dalam visualisasi grafik yang mudah dipahami.
            </p>
          </div>

          <div
            className="p-8 rounded-2xl border transition-all duration-300 group">
            <h4 className="font-bold text-xl mb-3 transition-colors">
              Kontrol Pengeluaran
            </h4>
            <p className="text-sm leading-relaxed">
              Fitur budgeting pintar untuk menjaga pengeluaran agar tidak melebihi batas.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section id="fitur" className="py-24 px-10">
        <h3 className="text-3xl font-bold text-center mb-16">
          Fitur Unggulan
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="border p-6 rounded-2xl shadow-sm transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center font-bold text-lg">
              📊
            </div>
            <h4 className="font-bold mb-2">
              Dashboard Keuangan
            </h4>
            <p className="text-sm">
              Ringkasan saldo, pemasukan, dan pengeluaran real-time.
            </p>
          </div>

          <div className="border p-6 rounded-2xl shadow-sm transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center font-bold text-lg">
              💸
            </div>
            <h4 className="font-bold mb-2">
              Manajemen Transaksi
            </h4>
            <p className="text-sm">
              Catat transaksi harian dengan cepat dan mudah.
            </p>
          </div>

          <div className="border p-6 rounded-2xl shadow-sm transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <h4 className="font-bold mb-2">
              Anggaran (Budgeting)
            </h4>
            <p className="text-sm">
              Atur batas pengeluaran setiap kategori agar hemat.
            </p>
          </div>

          <div className="border p-6 rounded-2xl shadow-sm transition-all duration-300 hover:scale-105">
            <div
              className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center font-bold text-lg">
              📑
            </div>
            <h4 className="font-bold mb-2">
              Laporan Keuangan
            </h4>
            <p className="text-sm">
              Export laporan bulanan dan tahunan secara otomatis.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="text-white py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-5"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-4xl font-bold mb-6">
            Siap Mengelola Keuangan Lebih Baik?
          </h3>
          <p className="mb-10 text-lg max-w-2xl mx-auto">
            Jangan biarkan uangmu habis tanpa jejak. Mulai gunakan Cerdas Finansial sekarang dan rasakan
            kemudahannya.
          </p>
          <Link href="/registrasi" className="px-8 py-4 rounded-full font-bold transition-colors shadow-lg">
            Daftar Gratis Sekarang
          </Link>
        </div>

      </section>

    </main>
    </>
  );
}
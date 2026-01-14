"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef} from "react";
export default function HomePage() {
  const heroRef = useRef(null);
  const featureCardsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);
  
    featureCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#FDF8F9] text-[#426E55] selection:bg-[#CB748E] selection:text-white font-sans antialiased">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-10 py-5 border-b border-[#73986F]/20 bg-white/90 backdrop-blur-lg transition-all duration-300 hover:border-[#73986F]/40">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#426E55] via-[#73986F] to-[#2D4839] bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
          Cerdas Finansial
        </h1>

        <nav className="flex items-center space-x-6 text-[#426E55] font-medium">
          <Link 
            href="#fitur" 
            className="hover:text-[#73986F] transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#73986F] after:to-[#426E55] hover:after:w-full after:transition-all after:duration-300"
          >
            Fitur
          </Link>
          
          <Link 
            href="#manfaat" 
            className="hover:text-[#73986F] transition-all duration-300 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#73986F] after:to-[#426E55] hover:after:w-full after:transition-all after:duration-300"
          >
            Manfaat
          </Link>

          <Link 
            href="/login"
            className="group relative px-6 py-2.5 rounded-full overflow-hidden bg-gradient-to-r from-[#426E55] to-[#2D4839] text-white shadow-lg shadow-[#426E55]/30 hover:shadow-xl hover:shadow-[#426E55]/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10 group-hover:tracking-wider transition-all duration-300 flex items-center">
              Login
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#73986F] to-[#426E55] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section 
        ref={heroRef}
        className="grid md:grid-cols-2 gap-12 px-6 md:px-10 py-20 md:py-24 items-center bg-gradient-to-br from-white via-[#F8FBFA] to-[#E6F1ED] relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#73986F]/10 to-[#426E55]/5 rounded-full animate-pulse-slow"></div>
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
      <section id="manfaat" className="bg-white py-24 px-10 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-[#EED4DB] rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2">
        </div>

        <h3 className="text-3xl font-bold text-center mb-16 text-[#2D4839]">
          Kenapa Harus Pakai <span className="border-b-4 border-[#CB748E]/50">Cerdas Finansial?</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          <div
            className="bg-[#FDF8F9] p-8 rounded-2xl border border-[#EED4DB] hover:border-[#CB748E] hover:shadow-xl hover:shadow-[#CB748E]/10 transition-all duration-300 hover:-translate-y-2 group">
            <h4 className="font-bold text-xl mb-3 text-[#2D4839] group-hover:text-[#CB748E] transition-colors">
              Pencatatan Lebih Akurat
            </h4>
            <p className="text-[#426E55] text-sm leading-relaxed">
              Mengurangi kesalahan pencatatan manual dengan sistem otomatis yang terintegrasi.
            </p>
          </div>

          <div
            className="bg-[#FDF8F9] p-8 rounded-2xl border border-[#EED4DB] hover:border-[#CB748E] hover:shadow-xl hover:shadow-[#CB748E]/10 transition-all duration-300 hover:-translate-y-2 group">
            <h4 className="font-bold text-xl mb-3 text-[#2D4839] group-hover:text-[#CB748E] transition-colors">
              Laporan Keuangan Jelas
            </h4>
            <p className="text-[#426E55] text-sm leading-relaxed">
              Data keuangan tersaji rapi dalam visualisasi grafik yang mudah dipahami.
            </p>
          </div>

          <div
            className="bg-[#FDF8F9] p-8 rounded-2xl border border-[#EED4DB] hover:border-[#CB748E] hover:shadow-xl hover:shadow-[#CB748E]/10 transition-all duration-300 hover:-translate-y-2 group">
            <h4 className="font-bold text-xl mb-3 text-[#2D4839] group-hover:text-[#CB748E] transition-colors">
              Kontrol Pengeluaran
            </h4>
            <p className="text-[#426E55] text-sm leading-relaxed">
              Fitur budgeting pintar untuk menjaga pengeluaran agar tidak melebihi batas.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FITUR ================= */}
      <section id="fitur" className="py-24 px-10 bg-gradient-to-b from-[#FDF8F9] to-white">
        <h3 className="text-3xl font-bold text-center mb-16 text-[#2D4839]">
          Fitur Unggulan
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#73986F]/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-[#EED4DB] rounded-lg mb-4 flex items-center justify-center text-[#CB748E] font-bold text-lg">
              📊
            </div>
            <h4 className="font-bold mb-2 text-[#2D4839]">
              Dashboard Keuangan
            </h4>
            <p className="text-sm text-[#426E55]">
              Ringkasan saldo, pemasukan, dan pengeluaran real-time.
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#73986F]/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-[#EED4DB] rounded-lg mb-4 flex items-center justify-center text-[#CB748E] font-bold text-lg">
              💸
            </div>
            <h4 className="font-bold mb-2 text-[#2D4839]">
              Manajemen Transaksi
            </h4>
            <p className="text-sm text-[#426E55]">
              Catat transaksi harian dengan cepat dan mudah.
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#73986F]/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-[#EED4DB] rounded-lg mb-4 flex items-center justify-center text-[#CB748E] font-bold text-lg">
              🛡️
            </div>
            <h4 className="font-bold mb-2 text-[#2D4839]">
              Anggaran (Budgeting)
            </h4>
            <p className="text-sm text-[#426E55]">
              Atur batas pengeluaran setiap kategori agar hemat.
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#73986F]/20 transition-all duration-300 hover:scale-105">
            <div
              className="w-12 h-12 bg-[#EED4DB] rounded-lg mb-4 flex items-center justify-center text-[#CB748E] font-bold text-lg">
              📑
            </div>
            <h4 className="font-bold mb-2 text-[#2D4839]">
              Laporan Keuangan
            </h4>
            <p className="text-sm text-[#426E55]">
              Export laporan bulanan dan tahunan secara otomatis.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-br from-[#2D4839] to-[#426E55] text-white py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-5"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#73986F] rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-4xl font-bold mb-6 text-[#EED4DB]">
            Siap Mengelola Keuangan Lebih Baik?
          </h3>
          <p className="mb-10 text-gray-200 text-lg max-w-2xl mx-auto">
            Jangan biarkan uangmu habis tanpa jejak. Mulai gunakan Cerdas Finansial sekarang dan rasakan
            kemudahannya.
          </p>
          <Link href="/registrasi" className="bg-white text-[#2D4839] px-8 py-4 rounded-full font-bold hover:bg-[#EED4DB] transition-colors shadow-lg hover:shadow-[#EED4DB]/30">
            Daftar Gratis Sekarang
          </Link>
        </div>

      </section>

    </main>
  );
}
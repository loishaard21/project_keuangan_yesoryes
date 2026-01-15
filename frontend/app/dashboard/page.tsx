"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

/* ================= TYPES ================= */
type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

/* ================= MAIN COMPONENT ================= */
export default function FinanceDashboard() {
  const router = useRouter();
  const pathname = usePathname();

  // ================= ACCOUNT STATE =================
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountForm, setAccountForm] = useState({
    name: "",
    balance: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
  });

  /* ================= HANDLERS ================= */
  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleAddTransaction = async () => {
    const amount = Number(form.amount);
    if (!form.category || isNaN(amount)) {
      alert("Lengkapi data transaksi");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          type: form.type.toUpperCase(),
          category: form.category,
          userId: user.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal menambahkan transaksi");
      }

      const savedTransaction = await res.json();

      const newTransaction: Transaction = {
        id: savedTransaction.id.toString(),
        type: savedTransaction.type.toLowerCase(),
        category: savedTransaction.category,
        amount: savedTransaction.amount,
        date: new Date(savedTransaction.createdAt)
          .toISOString()
          .split("T")[0],
      };

      setTransactions((prev) => [...prev, newTransaction]);
      setForm({ type: "income", category: "", amount: "" });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan transaksi ke database");
    }
  };

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  useEffect(() => {
    if (!user?.id) return;

    setIsLoading(true);
    fetch(`http://localhost:3000/api/transactions?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((t: any) => ({
          id: t.id.toString(),
          type: t.type.toLowerCase(),
          category: t.category,
          amount: t.amount,
          date: new Date(t.createdAt).toISOString().split("T")[0],
        }));
        setTransactions(formatted);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

  const handleAddAccount = async () => {
    const balance = Number(accountForm.balance);

    if (!accountForm.name || isNaN(balance)) {
      alert("Nama akun dan saldo wajib diisi");
      return;
    }

    if (!user?.id) {
      alert("User belum login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: accountForm.name,
          balance,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        throw new Error("Gagal menambahkan akun");
      }

      alert("Akun berhasil ditambahkan");
      setAccountForm({ name: "", balance: "" });
      setShowAccountModal(false);
    } catch (error) {
      console.error("ADD ACCOUNT ERROR:", error);
      alert("Gagal menyimpan akun");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal hapus transaksi");

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Gagal menghapus transaksi");
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  /* ================= CALCULATION ================= */
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  const chartData = [
    {
      name: "Pendapatan",
      value: totalIncome,
      color: "#73986F",
    },
    {
      name: "Pengeluaran",
      value: totalExpense,
      color: "#CB748E",
    },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f4] via-[#e8f4ee] to-[#d9ede3] text-[#2D4839]">
      {/* ================= OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#2D4839]/40 z-40 backdrop-blur-sm animate-fadeIn"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#2D4839] to-[#426E55] text-white p-6 z-50 shadow-2xl transform transition-all duration-500 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10 border-b border-[#73986F]/40 pb-4">
          <h1 
            className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-white to-[#D698AB] bg-clip-text text-transparent animate-slideInLeft"
          >
            CERDAS FINANSIAL
          </h1>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="text-white/70 hover:text-white transition-all duration-300 hover:rotate-90 p-1"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-3">
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Transaksi", path: "/transaksi" },
            { label: "Laporan", path: "/laporan" },
            { label: "Anggaran", path: "/anggaran" },
            { label: "Pengaturan", path: "/pengaturan" },
          ].map((item, index) => (
            <div
              key={item.path}
              className="animate-slideInLeft"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden ${
                  pathname === item.path
                    ? "bg-white/20 backdrop-blur-sm text-white font-bold shadow-lg border border-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10">{item.label}</span>
                <div
                  className={`ml-auto relative z-10 transition-all duration-300 ${
                    pathname === item.path ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                >
                  →
                </div>
              </Link>
            </div>
          ))}
        </nav>

        <div 
          className="mt-8 pt-6 border-t border-white/20 animate-slideInUp"
        >
          <button
            onClick={() => setShowAccountModal(true)}
            className="w-full bg-gradient-to-r from-[#73986F] to-[#426E55] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.02]"
          >
            + Tambah Akun Baru
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="p-6 lg:ml-0 transition-all">
        {/* ================= TOP BAR ================= */}
        <div 
          className="flex justify-between items-center mb-8 animate-slideInDown"
        >
          <div className="flex items-center gap-4">
            {/* HAMBURGER */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 bg-white/90 hover:bg-white rounded-xl shadow-sm border border-[#73986F]/20 transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              <span 
                className={`block w-6 h-0.5 bg-gradient-to-r from-[#2D4839] to-[#426E55] mb-1.5 transition-all duration-300 ${
                  sidebarOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-gradient-to-r from-[#2D4839] to-[#426E55] mb-1.5 transition-all duration-300 ${
                  sidebarOpen ? "opacity-0" : ""
                }`}
              />
              <span 
                className={`block w-6 h-0.5 bg-gradient-to-r from-[#2D4839] to-[#426E55] transition-all duration-300 ${
                  sidebarOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#2D4839] via-[#426E55] to-[#73986F] bg-clip-text text-transparent">
              Dashboard Keuangan
            </h1>
          </div>

          {/* PROFILE - DIPERBAIKI */}
          <div className="relative">
            <button
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-3 bg-white/95 px-5 py-2.5 rounded-full shadow-lg border border-[#73986F]/20 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#73986F] to-[#426E55] flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0) || "A"}
              </div>
              <span className="text-sm font-bold text-[#2D4839]">{user?.name || "Akun"}</span>
              <div className={`transition-transform duration-200 ${openUserMenu ? "rotate-180" : ""}`}>
                ▼
              </div>
            </button>

            {openUserMenu && (
              <div
                className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#73986F]/20 overflow-hidden z-30 animate-slideInDown"
              >
                <Link 
                  href="/pengaturan" 
                  className="block px-5 py-4 text-[#2D4839] hover:bg-gradient-to-r from-[#EED4DB]/20 to-[#f9f9f9] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#73986F] to-[#426E55] flex items-center justify-center text-white text-sm">
                      👤
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform">Profil Saya</span>
                  </div>
                </Link>
                <div className="h-px bg-gradient-to-r from-transparent via-[#73986F]/20 to-transparent mx-4"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-4 text-[#CB748E] font-bold hover:bg-gradient-to-r from-[#fff0f3] to-[#f9f9f9] transition-all duration-300 group hover:scale-[1.02] active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CB748E] to-[#D698AB] flex items-center justify-center text-white text-sm">
                      🚪
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">Logout</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="animate-slideInUp" style={{ animationDelay: "0ms" }}>
            <SummaryCard 
              title="Saldo Total" 
              value={balance} 
              color="from-[#426E55] to-[#73986F]"
              icon="💰"
              delay={0}
            />
          </div>
          <div className="animate-slideInUp" style={{ animationDelay: "100ms" }}>
            <SummaryCard 
              title="Total Pendapatan" 
              value={totalIncome} 
              color="from-[#73986F] to-[#8AB388]"
              icon="📈"
              delay={0.1}
            />
          </div>
          <div className="animate-slideInUp" style={{ animationDelay: "200ms" }}>
            <SummaryCard 
              title="Total Pengeluaran" 
              value={totalExpense} 
              color="from-[#CB748E] to-[#D698AB]"
              icon="📉"
              delay={0.2}
            />
          </div>
        </div>

        {/* ================= CHART SECTION - DIPERBAIKI ================= */}
        <div
          className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 mb-8 hover:shadow-2xl transition-shadow duration-500 animate-fadeIn"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
              Ringkasan Keuangan
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#73986F] shadow-sm"></div>
                <span className="text-sm font-medium text-[#2D4839]">Pendapatan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#CB748E] shadow-sm"></div>
                <span className="text-sm font-medium text-[#2D4839]">Pengeluaran</span>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-[#73986F]/20 border-t-[#73986F] rounded-full animate-spin-slow" />
              </div>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie 
                    data={chartData} 
                    dataKey="value" 
                    outerRadius={100} 
                    innerRadius={60}
                    paddingAngle={2}
                    stroke="white"
                    strokeWidth={3}
                    animationDuration={1500}
                    animationBegin={300}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    <Cell fill="#73986F" />
                    <Cell fill="#CB748E" />
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`Rp ${Number(value).toLocaleString()}`, '']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '12px', 
                      border: '1px solid #73986F/20',
                      boxShadow: '0 4px 20px rgba(45, 72, 57, 0.1)',
                      fontSize: '14px'
                    }}
                    itemStyle={{ 
                      color: '#2D4839', 
                      fontWeight: '600'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm font-medium text-[#2D4839]">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ================= TRANSACTION TABLE ================= */}
        <div
          className="bg-white/90 p-8 rounded-3xl shadow-xl border border-[#73986F]/10 animate-fadeIn"
          style={{ animationDelay: "400ms" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
                Riwayat Transaksi
              </h2>
              <p className="text-[#73986F] mt-1 font-medium">Transaksi terbaru Anda</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-[#426E55] to-[#2D4839] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              <span className={`text-xl transition-transform ${showModal ? "rotate-45" : ""}`}>
                +
              </span>
              <span>Tambah Transaksi</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-3 border-[#73986F]/20 border-t-[#73986F] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#73986F]/10">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#73986F]/5 to-[#426E55]/5">
                    <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Tanggal</th>
                    <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Jenis</th>
                    <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Kategori</th>
                    <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Nominal</th>
                    <th className="p-4 text-left text-[#2D4839] font-semibold border-b border-[#73986F]/10">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8">
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EED4DB] to-[#D698AB] flex items-center justify-center mb-4 shadow-lg">
                            <span className="text-3xl">📝</span>
                          </div>
                          <p className="text-[#73986F] text-lg font-medium">Belum ada transaksi</p>
                          <p className="text-[#D698AB] mt-1 font-medium">Mulai dengan menambahkan transaksi pertama Anda</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((t, index) => (
                      <tr
                        key={t.id}
                        className="border-b border-[#73986F]/5 hover:bg-[#73986F]/5 transition-colors duration-300 animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="p-4 font-medium">{t.date}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                            t.type === "income" 
                              ? "bg-gradient-to-r from-[#73986F]/15 to-[#8AB388]/15 text-[#426E55] border border-[#73986F]/20" 
                              : "bg-gradient-to-r from-[#CB748E]/15 to-[#D698AB]/15 text-[#CB748E] border border-[#CB748E]/20"
                          }`}>
                            {t.type === "income" ? "📈" : "📉"}
                            {t.type === "income" ? "Pendapatan" : "Pengeluaran"}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-[#2D4839]">{t.category}</td>
                        <td className="p-4 font-bold text-lg">
                          <span className={t.type === "income" ? "text-[#426E55]" : "text-[#CB748E]"}>
                            {t.type === "income" ? "+" : "-"} Rp {t.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#CB748E]/10 to-[#D698AB]/10 text-[#CB748E] hover:text-white hover:from-[#CB748E] hover:to-[#D698AB] transition-all duration-300 font-medium hover:scale-110 active:scale-95 border border-[#CB748E]/20"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= MODAL - DIPERBAIKI (TANPA PILIH AKUN) ================= */}
        {showModal && (
          <Modal
            form={form}
            onChange={handleInputChange}
            onClose={() => setShowModal(false)}
            onSave={handleAddTransaction}
          />
        )}

        {showAccountModal && (
          <AccountModal
            form={accountForm}
            onChange={(key: string, value: string) =>
              setAccountForm({ ...accountForm, [key]: value })
            }
            onClose={() => setShowAccountModal(false)}
            onSave={handleAddAccount}
          />
        )}
      </div>

      {/* ================= CUSTOM CSS ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */
function SummaryCard({ title, value, color, icon, delay }: any) {
  return (
    <div
      className="bg-white/95 p-6 rounded-2xl shadow-lg border border-[#73986F]/10 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] hover:-translate-y-1"
    >
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color.split(' ')[1]}, ${color.split(' ')[3]})` }}
      />
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[#73986F] text-sm font-medium mb-2">{title}</p>
          <p className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            Rp {value.toLocaleString()}
          </p>
        </div>
        <div className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
          {icon}
        </div>
      </div>
      <div 
        className="h-1 w-full bg-gradient-to-r from-transparent via-[#73986F]/20 to-transparent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ transitionDelay: `${(delay + 0.2) * 1000}ms` }}
      />
    </div>
  );
}

function Modal({ form, onChange, onClose, onSave }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-[#73986F]/20 w-full max-w-md animate-slideInUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
            Tambah Transaksi
          </h2>
          <button
            onClick={onClose}
            className="text-[#73986F] hover:text-[#2D4839] p-1 transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#2D4839] mb-2">Jenis Transaksi</label>
            <select
              value={form.type}
              onChange={(e) => onChange("type", e.target.value)}
              className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white focus:scale-[1.02] text-[#2D4839]"
            >
              <option value="income" className="text-[#426E55]">📈 Pendapatan</option>
              <option value="expense" className="text-[#CB748E]">📉 Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4839] mb-2">Kategori</label>
            <input
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              placeholder="Contoh: Gaji, Makanan, Transportasi"
              className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white focus:scale-[1.02] text-[#2D4839]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4839] mb-2">Nominal (Rp)</label>
            <input
              value={form.amount}
              onChange={(e) => onChange("amount", e.target.value.replace(/\D/g, ""))}
              placeholder="0"
              className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-lg font-bold focus:scale-[1.02] text-[#2D4839]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-[#EED4DB] to-[#D698AB] text-[#2D4839] font-medium rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-[#D698AB]/30"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2.5 bg-gradient-to-r from-[#426E55] to-[#2D4839] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            Simpan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountModal({ form, onChange, onClose, onSave }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-[#73986F]/20 w-full max-w-md animate-slideInUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2D4839] to-[#426E55] bg-clip-text text-transparent">
            Tambah Akun
          </h2>
          <button
            onClick={onClose}
            className="text-[#73986F] hover:text-[#2D4839] p-1 transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#2D4839] mb-2">Nama Akun</label>
            <input
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Contoh: BCA, Dana, Cash"
              className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white focus:scale-[1.02]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D4839] mb-2">Saldo Awal (Rp)</label>
            <input
              value={form.balance}
              onChange={(e) => onChange("balance", e.target.value.replace(/\D/g, ""))}
              placeholder="0"
              className="w-full border-2 border-[#73986F]/20 p-3 rounded-xl focus:outline-none focus:border-[#73986F] focus:ring-2 focus:ring-[#73986F]/30 transition-all bg-white text-lg font-bold focus:scale-[1.02]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-[#EED4DB] to-[#D698AB] text-[#2D4839] font-medium rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2.5 bg-gradient-to-r from-[#73986F] to-[#426E55] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            Simpan Akun
          </button>
        </div>
      </div>
    </div>
  );
}
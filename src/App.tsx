import React, { useState, useEffect } from 'react';
import { Leaf, Info,  LayoutDashboard,  Mail,  Menu, X, ChevronRight, Recycle, Trash2, Calculator, MapPin, Trophy, ArrowRight, Github, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {  BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  PieChart, Pie, Cell } from 'recharts';
import { cn } from './utils/cn';

// --- Types ---

type Page = 'home' | 'about' | 'content' | 'contact';

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: Page, setActivePage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Leaf className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'content', label: 'Konten', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActivePage('home')}
          >
            <div className="bg-eco-green p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-eco-dark tracking-tight">EcoTrack</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-eco-green flex items-center gap-2",
                  activePage === item.id ? "text-eco-green" : "text-slate-600"
                )}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => setActivePage('content')}
              className="bg-eco-green text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-eco-dark transition-colors shadow-lg shadow-eco-green/20"
            >
              Mulai Edukasi
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 w-full p-3 rounded-xl text-left font-medium",
                    activePage === item.id ? "bg-eco-light text-eco-green" : "text-slate-600"
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const HomePage = ({ onStart }: { onStart: () => void }) => {
  const stats = [
    { label: 'Sampah Plastik/Tahun', value: '64 Juta Ton', icon: <Trash2 className="text-red-500" /> },
    { label: 'Sampah Terkelola', value: '45%', icon: <Recycle className="text-eco-green" /> },
    { label: 'Target 2025', value: '70%', icon: <Trophy className="text-yellow-500" /> },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-eco-light text-eco-green px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Leaf className="w-4 h-4" />
                <span>TECHSOFT 2026 - Subtema Lingkungan</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-tight mb-6">
                Kelola Sampah, <br />
                <span className="text-eco-green">Selamatkan Bumi.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                EcoTrack adalah platform edukasi digital yang membantu Anda memahami jenis sampah, menghitung dampak lingkungan, dan menemukan solusi pengelolaan sampah yang berkelanjutan.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onStart}
                  className="bg-eco-green text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-eco-dark transition-all shadow-xl shadow-eco-green/30 flex items-center gap-2 group"
                >
                  Mulai Edukasi
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Waste Management" 
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-eco-green/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-eco-green/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">Statistik Sampah Indonesia</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Data terkini mengenai kondisi pengelolaan sampah di tanah air yang perlu kita perhatikan bersama.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
              >
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  {React.cloneElement(stat.icon as React.ReactElement, { className: "w-8 h-8" })}
                </div>
                <div className="text-4xl font-display font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">Tentang EcoTrack</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Membangun masa depan yang lebih bersih melalui edukasi dan teknologi.
          </p>
        </motion.div>

        <div className="space-y-12">
          <section className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Latar Belakang</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Masalah sampah di Indonesia terus meningkat seiring dengan pertumbuhan populasi dan konsumsi. Kurangnya pemahaman masyarakat mengenai pemilahan dan pengolahan sampah menjadi hambatan utama dalam menciptakan lingkungan yang berkelanjutan.
            </p>
            <p className="text-slate-600 leading-relaxed">
              EcoTrack hadir sebagai solusi digital untuk menjembatani kesenjangan informasi tersebut, memberikan alat praktis bagi setiap individu untuk berkontribusi dalam pengurangan sampah.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-eco-green text-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-eco-green/20">
              <h2 className="text-2xl font-display font-bold mb-4">Visi</h2>
              <p className="opacity-90 leading-relaxed">
                Menjadi platform edukasi sampah nomor satu di Indonesia yang mampu mengubah perilaku masyarakat menuju gaya hidup bebas sampah (Zero Waste).
              </p>
            </div>
            <div className="bg-eco-dark text-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-eco-dark/20">
              <h2 className="text-2xl font-display font-bold mb-4">Misi</h2>
              <ul className="space-y-3 opacity-90 leading-relaxed list-disc pl-5">
                <li>Menyediakan informasi edukatif yang mudah dipahami.</li>
                <li>Mengembangkan fitur interaktif untuk pemantauan sampah.</li>
                <li>Membangun komunitas yang peduli lingkungan.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentPage = () => {
  const [activeTab, setActiveTab] = useState<'edu' | 'calc' | 'map' | 'challenge'>('edu');

  const wasteTypes = [
    {
      title: 'Sampah Organik',
      desc: 'Sampah yang berasal dari sisa makhluk hidup dan mudah membusuk.',
      examples: 'Sisa makanan, daun kering, kulit buah.',
      treatment: 'Pengomposan, pakan ternak, Eco-Enzyme.',
      color: 'bg-green-100 text-green-700 border-green-200',
      icon: <Leaf />,
      img: 'image/sampah-organik.jpg'
    },
    {
      title: 'Sampah Anorganik',
      desc: 'Sampah yang tidak mudah membusuk dan berasal dari bahan non-hayati.',
      examples: 'Plastik, botol kaca, kaleng, kertas.',
      treatment: 'Daur ulang (Recycle), kerajinan tangan, Bank Sampah.',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: <Recycle />,
      img: 'image/sampah-anorganik.webp'
    },
    {
      title: 'Sampah B3',
      desc: 'Bahan Berbahaya dan Beracun yang memerlukan penanganan khusus.',
      examples: 'Baterai, lampu, botol deterjen, limbah medis.',
      treatment: 'Diserahkan ke pihak pengelola limbah berlisensi.',
      color: 'bg-red-100 text-red-700 border-red-200',
      icon: <Trash2 />,
      img: 'image/sampah-b3.webp'
    }
  ];

  const [calcData, setCalcData] = useState({ plastic: 0, paper: 0, food: 0 });
  const [calcResult, setCalcResult] = useState<any>(null);

  const calculateWaste = () => {
    const monthlyPlastic = calcData.plastic * 4;
    const monthlyPaper = calcData.paper * 4;
    const monthlyFood = calcData.food * 4;
    const total = monthlyPlastic + monthlyPaper + monthlyFood;
    
    setCalcResult({
      total,
      breakdown: [
        { name: 'Plastik', value: monthlyPlastic },
        { name: 'Kertas', value: monthlyPaper },
        { name: 'Makanan', value: monthlyFood },
      ],
      impact: total * 0.5, // Simple multiplier for CO2 or something
      tips: total > 10 ? 'Coba gunakan tumbler dan kurangi pesan antar makanan.' : 'Bagus! Pertahankan gaya hidup minim sampah Anda.'
    });
  };

  const banks = [
    { city: 'Blitar', name: 'Bank Sampah Patria', address: 'Jl. Merdeka No. 10', lat: -8.0983, lng: 112.1681 },
    { city: 'Malang', name: 'Bank Sampah Malang (BSM)', address: 'Jl. Gadang No. 5', lat: -7.9839, lng: 112.6214 },
    { city: 'Surabaya', name: 'Bank Sampah Induk Surabaya', address: 'Jl. Ngagel No. 123', lat: -7.2575, lng: 112.7521 },
  ];

  const challenges = [
    { 
      id: 'no-plastic',
      title: '7 Hari Tanpa Plastik', 
      days: 7, 
      desc: 'Tantangan untuk tidak menggunakan plastik sekali pakai selama seminggu.', 
      points: 100,
      tasks: [
        'Gunakan tumbler untuk minum',
        'Bawa tas belanja sendiri',
        'Tolak sedotan plastik',
        'Gunakan alat makan non-plastik',
        'Beli produk tanpa kemasan plastik berlebih'
      ]
    },
    { 
      id: 'eco-lifestyle',
      title: '30 Hari Eco Lifestyle', 
      days: 30, 
      desc: 'Terapkan gaya hidup ramah lingkungan secara konsisten selama sebulan.', 
      points: 500,
      tasks: [
        'Hemat penggunaan air',
        'Matikan lampu jika tidak digunakan',
        'Gunakan transportasi umum/sepeda',
        'Kurangi konsumsi daging',
        'Donasikan barang yang tidak terpakai'
      ]
    },
    { 
      id: 'compost',
      title: 'Kompos Mandiri', 
      days: 14, 
      desc: 'Mulai mengolah sampah organik rumah tangga menjadi kompos.', 
      points: 250,
      tasks: [
        'Siapkan wadah komposter',
        'Pisahkan sampah organik',
        'Cacah sampah organik',
        'Tambahkan aktivator kompos',
        'Aduk kompos secara rutin'
      ]
    },
  ];

  const [activeChallenge, setActiveChallenge] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleTask = (idx: number) => {
    if (completedTasks.includes(idx)) {
      setCompletedTasks(completedTasks.filter(i => i !== idx));
    } else {
      setCompletedTasks([...completedTasks, idx]);
    }
  };

  const progress = activeChallenge ? (completedTasks.length / activeChallenge.tasks.length) * 100 : 0;

  const tips = [
    { title: 'Bawa Tumbler', desc: 'Kurangi penggunaan botol plastik sekali pakai dengan membawa botol minum sendiri.', icon: <Leaf className="text-eco-green" /> },
    { title: 'Kurangi Plastik', desc: 'Hindari penggunaan sedotan, alat makan, dan kantong plastik sekali pakai.', icon: <Trash2 className="text-red-500" /> },
    { title: 'Gunakan Tas Kain', desc: 'Selalu siapkan tas belanja kain saat pergi ke pasar atau supermarket.', icon: <Recycle className="text-blue-500" /> },
    { title: 'Kompos Rumah', desc: 'Mulai mengolah sisa sayuran dan buah menjadi pupuk organik di rumah.', icon: <Leaf className="text-yellow-600" /> },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'edu', label: 'Edukasi', icon: <Leaf className="w-4 h-4" /> },
            { id: 'calc', label: 'Kalkulator', icon: <Calculator className="w-4 h-4" /> },
            { id: 'map', label: 'Peta Bank', icon: <MapPin className="w-4 h-4" /> },
            { id: 'challenge', label: 'Challenge', icon: <Trophy className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-eco-green text-white shadow-lg shadow-eco-green/20" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'edu' && (
            <motion.div
              key="edu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {wasteTypes.map((type, idx) => (
                  <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={type.img} 
                        alt={type.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          console.error(`Gambar ${type.title} gagal dimuat:`, type.img);
                          (e.target as HTMLImageElement).src = '/src/assets/fallback-waste.jpg'; // Fallback jika ada
                        }}
                      />
                    </div>
                    <div className="p-8">
                      <div className={cn("inline-flex p-3 rounded-2xl mb-6", type.color)}>
                        {React.cloneElement(type.icon as React.ReactElement, { className: "w-6 h-6" })}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{type.title}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">{type.desc}</p>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Contoh</span>
                          <p className="text-slate-700 font-medium">{type.examples}</p>
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pengolahan</span>
                          <p className="text-eco-green font-bold">{type.treatment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips Section */}
              <div className="bg-slate-50 rounded-[3rem] p-8 lg:p-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Tips Ramah Lingkungan</h2>
                  <p className="text-slate-600">Langkah kecil yang bisa Anda lakukan setiap hari untuk dampak yang besar.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {tips.map((tip, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                      <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        {React.cloneElement(tip.icon as React.ReactElement, { className: "w-6 h-6" })}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">{tip.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'calc' && (
            <motion.div
              key="calc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">Input Sampah Mingguan</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Plastik (kg)</label>
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-eco-green outline-none"
                        placeholder="0"
                        onChange={(e) => setCalcData({...calcData, plastic: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Kertas/Kardus (kg)</label>
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-eco-green outline-none"
                        placeholder="0"
                        onChange={(e) => setCalcData({...calcData, paper: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Sisa Makanan (kg)</label>
                      <input 
                        type="number" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-eco-green outline-none"
                        placeholder="0"
                        onChange={(e) => setCalcData({...calcData, food: Number(e.target.value)})}
                      />
                    </div>
                    <button 
                      onClick={calculateWaste}
                      className="w-full bg-eco-green text-white py-4 rounded-2xl font-bold hover:bg-eco-dark transition-colors shadow-lg shadow-eco-green/20"
                    >
                      Hitung Dampak
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  {calcResult ? (
                    <div className="text-center">
                      <div className="mb-8 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={calcResult.breakdown}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill="#22c55e" />
                              <Cell fill="#3b82f6" />
                              <Cell fill="#f59e0b" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-4xl font-display font-bold text-slate-900 mb-2">{calcResult.total} kg</div>
                      <p className="text-slate-500 mb-6">Total sampah per bulan</p>
                      <div className="bg-eco-light p-6 rounded-2xl text-left border border-eco-green/10">
                        <div className="flex items-center gap-2 text-eco-green font-bold mb-2">
                          <Info className="w-4 h-4" />
                          <span>Saran Pengurangan</span>
                        </div>
                        <p className="text-eco-dark text-sm leading-relaxed">{calcResult.tips}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400">
                      <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Masukkan data untuk melihat estimasi dampak lingkungan Anda.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">Lokasi Bank Sampah</h3>
                  {banks.map((bank, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-eco-green transition-colors cursor-pointer group">
                      <div className="flex items-start gap-4">
                        <div className="bg-eco-light p-3 rounded-xl text-eco-green group-hover:bg-eco-green group-hover:text-white transition-colors">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-eco-green uppercase tracking-wider mb-1">{bank.city}</div>
                          <h4 className="font-bold text-slate-900 mb-1">{bank.name}</h4>
                          <p className="text-sm text-slate-500">{bank.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2 bg-slate-100 rounded-[2.5rem] min-h-[400px] flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                    alt="Map Placeholder" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 text-center p-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl max-w-sm">
                    <MapPin className="w-12 h-12 text-eco-green mx-auto mb-4" />
                    <h4 className="text-xl font-display font-bold text-slate-900 mb-2">Visualisasi Peta</h4>
                    <p className="text-slate-600 text-sm">Peta interaktif menampilkan titik-titik bank sampah di Jawa Timur (Blitar, Malang, Surabaya).</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {activeChallenge ? (
                <div className="max-w-3xl mx-auto bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="bg-yellow-50 text-yellow-600 w-fit p-3 rounded-xl mb-4">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-display font-bold text-slate-900 mb-2">{activeChallenge.title}</h3>
                      <p className="text-slate-500">{activeChallenge.desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveChallenge(null);
                        setCompletedTasks([]);
                      }}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="mb-10">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-slate-600">Progres Tantangan</span>
                      <span className="text-sm font-bold text-eco-green">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-eco-green"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 mb-4">Daftar Tugas</h4>
                    {activeChallenge.tasks.map((task: string, idx: number) => (
                      <div 
                        key={idx}
                        onClick={() => toggleTask(idx)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all",
                          completedTasks.includes(idx) 
                            ? "bg-eco-light border-eco-green/30 text-eco-dark" 
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                          completedTasks.includes(idx) ? "bg-eco-green border-eco-green" : "border-slate-200"
                        )}>
                          {completedTasks.includes(idx) && <Leaf className="w-3 h-3 text-white" />}
                        </div>
                        <span className={cn("font-medium", completedTasks.includes(idx) && "line-through opacity-60")}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>

                  {progress === 100 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-10 bg-yellow-50 p-6 rounded-3xl border border-yellow-200 text-center"
                    >
                      <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                      <h4 className="text-xl font-display font-bold text-yellow-800 mb-2">Selamat!</h4>
                      <p className="text-yellow-700">Anda telah menyelesaikan tantangan ini dan mendapatkan {activeChallenge.points} poin!</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {challenges.map((challenge, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
                      <div className="bg-yellow-50 text-yellow-600 w-fit p-4 rounded-2xl mb-6">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">{challenge.title}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4 uppercase tracking-wider">
                        <span>{challenge.days} Hari</span>
                        <span>•</span>
                        <span>{challenge.points} Poin</span>
                      </div>
                      <p className="text-slate-600 mb-8 flex-grow leading-relaxed">{challenge.desc}</p>
                      <button 
                        onClick={() => setActiveChallenge(challenge)}
                        className="w-full border-2 border-eco-green text-eco-green py-4 rounded-2xl font-bold hover:bg-eco-green hover:text-white transition-all"
                      >
                        Ikuti Challenge
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">Hubungi Kami</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar dari Anda.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-eco-light p-4 rounded-2xl text-eco-green">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email</div>
                  <div className="text-lg font-bold text-slate-900">hello@ecotrack.id</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-eco-light p-4 rounded-2xl text-eco-green">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Alamat</div>
                  <div className="text-lg font-bold text-slate-900">Surabaya, Jawa Timur, Indonesia</div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button className="bg-slate-100 p-4 rounded-2xl text-slate-600 hover:bg-eco-green hover:text-white transition-all">
                <Instagram className="w-6 h-6" />
              </button>
              <button className="bg-slate-100 p-4 rounded-2xl text-slate-600 hover:bg-eco-green hover:text-white transition-all">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="bg-slate-100 p-4 rounded-2xl text-slate-600 hover:bg-eco-green hover:text-white transition-all">
                <Github className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-eco-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-10 h-10 text-eco-green" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Pesan Terkirim!</h3>
                <p className="text-slate-600">Terima kasih telah menghubungi EcoTrack. Kami akan segera merespon pesan Anda.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-eco-green font-bold hover:underline"
                >
                  Kirim pesan lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Nama Lengkap</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-eco-green outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-eco-green outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Pesan</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-eco-green outline-none resize-none"
                    placeholder="Apa yang bisa kami bantu?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-eco-green text-white py-4 rounded-2xl font-bold hover:bg-eco-dark transition-colors shadow-lg shadow-eco-green/20"
                >
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-white selection:bg-eco-green selection:text-white">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'home' && <HomePage onStart={() => setActivePage('content')} />}
            {activePage === 'about' && <AboutPage />}
            {activePage === 'content' && <ContentPage />}
            {activePage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-eco-green p-2 rounded-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight">EcoTrack</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                EcoTrack merupakan website edukasi digital yang bertujuan meningkatkan kesadaran masyarakat terhadap pengelolaan sampah dan dampaknya terhadap lingkungan.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Navigasi</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => setActivePage('home')} className="hover:text-eco-green transition-colors">Home</button></li>
                <li><button onClick={() => setActivePage('about')} className="hover:text-eco-green transition-colors">About</button></li>
                <li><button onClick={() => setActivePage('content')} className="hover:text-eco-green transition-colors">Konten</button></li>
                <li><button onClick={() => setActivePage('contact')} className="hover:text-eco-green transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-eco-green transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-eco-green transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-eco-green transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>© 2026 EcoTrack. Dibuat untuk Lomba TECHSOFT 2026.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

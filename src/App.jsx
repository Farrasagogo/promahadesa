import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ChevronRight, Star, ShieldCheck, Leaf, Award, Clock, Heart, MessageSquare, ShoppingCart, User, Search, Menu, X } from 'lucide-react';

import './App.css'

function App() {
  const products = [
    {
      id: 1,
      name: "Teh Bunga Mawar Merah",
      description: "Dibuat dari kelopak mawar merah terbaik, menghadirkan kesegaran alami dan beragam manfaat kesehatan.",
      image: "/placeholder.webp",
      category: "Bakery"
    },
    {
      id: 2,
      name: "Teh Bunga Mawar Merah",
      description: "Dibuat dari kelopak mawar merah terbaik, menghadirkan kesegaran alami dan beragam manfaat kesehatan.",
      image: "/placeholder.webp",
      category: "Beverages"
    },
    {
      id: 3,
      name: "Teh Bunga Mawar Merah",
      description: "Dibuat dari kelopak mawar merah terbaik, menghadirkan kesegaran alami dan beragam manfaat kesehatan.",
      image: "/placeholder.webp",
      category: "Dairy"
    }
  ];

  // Additional featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Kategori A - Premium",
      description: "Teh Mawar Grade A terbuat dari bunga mawar pilihan dengan kualitas tertinggi, memberikan rasa yang lembut dan aroma yang memikat.",
      image: "/placeholder.webp",
    },
    {
      id: 2,
      name: "Kategori B - Standar",
      description: "Teh Mawar Grade B menawarkan kualitas yang baik dengan rasa yang menyegarkan dan aroma mawar yang khas.",
      image: "/placeholder.webp",
    },
    {
      id: 3,
      name: "Kategori C - Ekonomis",
      description: "Teh Mawar Grade C merupakan pilihan ekonomis dengan rasa yang sederhana namun tetap memberikan kenikmatan setiap hari.",
      image: "/placeholder.webp",
    },
  ];

  // Product benefits data
  const productBenefits = [
    {
      id: 1,
      title: "Bahan Alami 100%",
      description: "Teh ini dibuat dari kelopak mawar merah pilihan tanpa campuran bahan kimia atau pewarna buatan, sehingga aman dikonsumsi setiap hari dan tetap mempertahankan manfaat alami dari bunga mawar.",
      icon: <Leaf className="w-10 h-10 text-green-500" />
    },
    {
      id: 2,
      title: "Tanpa Pengawet",
      description: "Diproses secara alami tanpa tambahan bahan pengawet, memastikan kesegaran teh tetap terjaga dan bebas dari zat berbahaya yang dapat mengganggu kesehatan.",
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />
    },
    {
      id: 3,
      title: "Kualitas Premium",
      description: "Dipetik dari kebun terbaik, teh ini melewati proses seleksi ketat dan pengeringan khusus untuk menjaga aroma, rasa, dan kandungan nutrisinya tetap optimal.",
      icon: <Award className="w-10 h-10 text-yellow-500" />
    },
    {
      id: 4,
      title: "Segar Setiap Hari",
      description: " Teh kami dikemas dengan standar tinggi untuk menjaga kualitas dan kesegarannya, sehingga Anda selalu bisa menikmati cita rasa terbaik dalam setiap seduhan.",
      icon: <Clock className="w-10 h-10 text-red-500" />
    }
  ];

  // Customer testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Andi Pratama",
      role: "Pecinta Teh",
      comment: "Teh mawar ini memiliki aroma yang sangat menenangkan dan rasa yang lembut. Cocok untuk menemani waktu santai di sore hari.",
      rating: 5,
      image: "/placeholder.webp"
    },
    {
      id: 2,
      name: "Rina Permata",
      role: "Ahli Herbal",
      comment: "Sebagai seorang yang mendalami manfaat herbal, saya sangat merekomendasikan teh mawar ini. Kualitasnya premium dan sangat menyehatkan.",
      rating: 5,
      image: "/placeholder.webp"
    },
    {
      id: 3,
      name: "Dewi Setiawan",
      role: "Blogger Kesehatan",
      comment: "Saya sudah mencoba banyak jenis teh herbal, tetapi teh mawar ini benar-benar memiliki rasa yang khas dan manfaat yang luar biasa untuk relaksasi.",
      rating: 4,
      image: "/placeholder.webp"
    }
  ];

  const [currentProduct, setCurrentProduct] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation links
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Produk', href: '/shop' },
    { name: 'Tentang Kami', href: '/categories' },
    { name: 'Komitmen', href: '/about' },
    { name: 'Testimoni', href: '/about' },
    { name: 'Kontak', href: '/contact' }
  ];

  // Get unique categories
  const categories = ["All", ...new Set([...products, ...featuredProducts].map(p => p.category))];

  // Handle navigation between products
  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  // Filter featured products by category
  const filteredProducts = activeCategory === "All" 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category === activeCategory);

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Modern Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <span className={`font-serif text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                RoseTea<span className="text-[#e19fc6]">Karangpring</span>
                </span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className={`font-medium text-sm hover:text-[#e19fc6] transition ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
              <nav className="flex flex-col space-y-3 px-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className="font-medium text-gray-800 hover:text-[#e19fc6] transition"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    {/* Enhanced Hero Section */}
<div className="relative w-full h-screen overflow-hidden">
  {/* Background image with animated overlay gradient */}
  <div 
    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105 animate-slow-zoom"
    style={{ 
      backgroundImage: `url(${products[currentProduct].image})`,
      opacity: 0.85
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
  
  {/* Decorative Elements */}
  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent" />
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent" />
  <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-[#e19fc6]/20 blur-3xl" />
  
  {/* Hero Content */}
  <div className="relative z-10 h-full flex items-center">
    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 text-white space-y-8">
        <div className="overflow-hidden">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
            <span className="block text-[#e19fc6] drop-shadow-lg">{products[currentProduct].name}</span>
            <span className="block text-3xl md:text-4xl mt-4 font-light italic text-white/90">Kualitas Premium, Rasa Istimewa</span>
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed animate-fade-in backdrop-blur-sm bg-black/10 p-4 rounded-lg border-l-4 border-[#e19fc6]">
          {products[currentProduct].description}
        </p>
       
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up mt-6">
          <button className="bg-[#e19fc6] hover:bg-[#d483b3] text-black font-bold py-4 px-10 rounded-full transition transform hover:scale-105 hover:shadow-glow shadow-lg flex items-center justify-center group">
            <span>Beli Sekarang</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button className="border-2 border-white hover:border-[#e19fc6] text-white hover:text-[#e19fc6] font-bold py-4 px-10 rounded-full transition hover:bg-white/10">
            Selengkapnya
          </button>
        </div>
      </div>
    
    </div>
  </div>
  

</div>
      {/* Featured Products Section */}
<section className="bg-gradient-to-b from-white to-pink-50 py-16 min-h-screen flex items-center">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-12">
      <span className="text-[#e19fc6] text-sm uppercase tracking-wider font-medium mb-2 inline-block px-4 py-1 bg-pink-50 rounded-full">Produk Kami</span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-4 mb-4">Kategori Produk Kami</h2>
      <div className="w-16 h-1 bg-[#e19fc6] mx-auto mb-6"></div>
      <p className="text-gray-600 max-w-2xl mx-auto text-base">
        Temukan berbagai pilihan teh mawar kami yang berkualitas, tersedia dalam grade A, B, dan C, masing-masing dengan rasa dan keunggulan yang unik.
      </p>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {filteredProducts.map(product => (
        <div key={product.id} className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100">
          <div className="relative overflow-hidden">
            <div 
              className="h-64 bg-cover bg-center transition duration-700 transform group-hover:scale-105"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            
            {/* Quick action buttons */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button className="bg-white hover:bg-[#e19fc6] text-[#e19fc6] hover:text-white font-medium py-2 px-6 rounded-full shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 mx-2 text-sm">
                Lihat Detail
              </button>
            </div>
            
            {/* Product badge - optional */}
            {product.isNew && (
              <div className="absolute top-4 right-4">
                <span className="bg-[#e19fc6] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Baru</span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-[#e19fc6] transition-colors duration-300">{product.name}</h3>
            <div className="w-10 h-0.5 bg-[#e19fc6] mb-3"></div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              {product.price && (
                <span className="font-medium text-gray-800">Rp {product.price.toLocaleString()}</span>
              )}
              {product.rating && (
                <div className="flex items-center bg-pink-50 px-2 py-1 rounded-full">
                  <span className="text-[#e19fc6] mr-1">★</span>
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* View All Products Button */}
    <div className="text-center mt-12">
    </div>
  </div>
</section>
      
      {/* About Us Section */}
      <section className="bg-gradient-to-b from-white to-pink-50 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">Tentang Kami</h2>
            <div className="w-24 h-1 bg-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto italic">
              RoseTea Karangpring, teh berkualitas dengan sentuhan lokal yang khas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Company Story */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b border-pink-200 pb-3">RoseTea Karangpring</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  RoseTea Karangpring adalah teh mawar premium yang diproduksi dengan bunga mawar pilihan, menghasilkan rasa yang lembut dan menyegarkan. Teh ini diproduksi dengan teknik tradisional yang menjaga kualitas dan kealamian rasa.
                </p>
                <p className="text-lg">
                  Dengan bahan baku dari Desa Karangpring yang dikenal dengan sebutan Desa Mawar, teh ini membawa sentuhan lokal yang istimewa. Setiap tegukan memberikan pengalaman teh yang berbeda, memanjakan lidah dengan sensasi ketenangan.
                </p>
                <p className="text-lg">
                  Nikmati RoseTea Karangpring kapan saja, baik di pagi hari untuk memulai aktivitas atau di sore hari untuk relaksasi. Temukan kenikmatan teh mawar dengan kualitas terbaik yang hadir dari Karangpring.
                </p>
              </div>
            </div>

            {/* Company Values */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b border-pink-200 pb-3">Nilai-Nilai Kami</h3>
              <div className="space-y-8">
                {[
                  {
                    title: "100% Alami & Organik",
                    description: "Tanpa bahan kimia, pewarna, atau pengawet buatan. Kami menjamin kemurnian produk dari kebun hingga cangkir Anda.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 14V7a2 2 0 012-2h6a2 2 0 012 2v7m-7 3v-3m0 0H7m5 0h3" />
                      </svg>
                    )
                  },
                  {
                    title: "Aroma & Rasa Mewah",
                    description: "Wangi khas mawar merah dengan rasa lembut yang menenangkan, menghadirkan pengalaman minum teh yang tak terlupakan.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )
                  },
                  {
                    title: "Dibuat dengan Standar Tinggi",
                    description: "Dipetik dari kebun terbaik dan dikeringkan dengan metode khusus untuk menjaga kandungan nutrisinya dan keaslian rasa mawar.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.768-.231-1.477-.632-2.195M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.768.231-1.477.632-2.195m0 0a5.002 5.002 0 019.536 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )
                  }
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-5 transform transition-all duration-300 hover:translate-x-2">
                    <div className="bg-pink-100 p-3 rounded-full shadow-md">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Highlight */}
          <div className="mt-24 bg-white p-10 rounded-xl shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold mb-4 text-gray-900">Tim Kami</h3>
              <div className="w-20 h-1 bg-pink-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                Sebuah tim berdedikasi dari petani hingga pengolah yang bersatu dalam misi menciptakan pengalaman teh mawar terbaik
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                {
                  name: "Pak Sukron",
                  role: "Penggagas",
                  description: "Pencetus ide RoseTea Karangpring dengan visi mengangkat produk lokal ke kancah nasional.",
                  image: "/placeholder.webp"
                },
                {
                  name: "Pak Tono",
                  role: "Petani Mawar Senior",
                  description: "Ahli budidaya mawar dengan pengalaman 25 tahun yang memastikan kualitas mawar terbaik.",
                  image: "/placeholder.webp"
                },
                {
                  name: "Bu Aminah",
                  role: "Petani Pengolah",
                  description: "Mewarisi teknik tradisional pengolahan mawar menjadi teh berkualitas premium.",
                  image: "/placeholder.webp"
                },
                {
                  name: "Agus Wibowo",
                  role: "Koordinator Petani Desa",
                  description: "Menghubungkan para petani desa dan memastikan praktek pertanian berkelanjutan.",
                  image: "/placeholder.webp"
                },
              ].map((member, index) => (
                <div key={index} className="text-center group">
                  <div
  className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 mx-auto bg-gray-100 rounded-full bg-cover bg-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-105 border-4 border-pink-100"
  style={{ backgroundImage: `url(${member.image})` }}
/>
                  <h4 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-pink-500 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm px-4">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="mt-24 text-center">
            <div className="bg-pink-50 p-10 rounded-xl shadow-lg max-w-4xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl text-gray-700 italic mb-6">
                "RoseTea Karangpring bukan hanya tentang teh mawar berkualitas, tapi juga tentang upaya kami dalam pemberdayaan petani desa dan pelestarian tradisi lokal. Setiap cangkir teh yang Anda nikmati adalah hasil kerja keras dari seluruh komunitas kami."
              </p>
              <div className="font-medium text-gray-900">Pak Sukron</div>
              <div className="text-pink-500">Penggagas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits Section with Elegant Design */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-3">
              <div className="h-1 w-16 bg-[#e19fc6] mx-auto"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-800">
              Komitmen Kami terhadap Kualitas & Kesehatan
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
              Kami tidak sekadar menjual produk, tetapi menghadirkan solusi kesehatan yang teruji dan terpercaya.
            </p>
          </div>

          {/* Enhanced Benefits Grid with Elegant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {productBenefits.map(benefit => (
              <div 
                key={benefit.id} 
                className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
              >
                <div className="mb-6 flex justify-center">
                  <div className="bg-[#e19fc6]/10 p-5 rounded-full group-hover:bg-[#e19fc6]/20 transition-all duration-300 transform group-hover:scale-110">
                    {React.cloneElement(benefit.icon, {
                      className: "w-12 h-12 text-[#e19fc6] transition-all duration-300"
                    })}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 font-serif">{benefit.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                <div className="flex justify-center items-center text-sm font-medium text-gray-500 bg-gray-50 py-2 px-4 rounded-full mx-auto w-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Telah Diuji & Terbukti
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Credibility Section with Curved Design */}
          <div className="relative rounded-3xl shadow-2xl overflow-hidden bg-white">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e19fc6]/5 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e19fc6]/5 rounded-full transform -translate-x-16 translate-y-16"></div>
            
            <div className="md:flex items-stretch relative z-10">
              <div className="md:w-1/2 p-10 md:p-16">
                <div className="mb-8 flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-gray-800">
                    Jaminan Kualitas Profesional
                  </h3>
                </div>
                
                <div className="space-y-6 text-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#e19fc6]/10 p-2 rounded-full flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e19fc6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-lg">Tersertifikasi Halal – Aman dan berkualitas untuk semua konsumen.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#e19fc6]/10 p-2 rounded-full flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e19fc6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-lg">Proses Higienis & Alami – Tanpa pengawet, tetap murni dan segar.</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#e19fc6]/10 p-2 rounded-full flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e19fc6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-lg">Kelopak Mawar Terbaik – Dipetik dari kebun pilihan untuk aroma dan rasa optimal.</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button className="bg-[#e19fc6] hover:bg-[#d084b3] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
              
              <div 
                className="md:w-1/2 h-96 md:h-auto bg-cover bg-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e19fc6]/10 to-transparent"></div>
                <img 
                  src="/placeholder.webp" 
                  alt="Product Quality" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-6 font-medium">Dipercaya & Diakui Oleh:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
              {/* Replace with actual trust badges/logos */}
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">Logo</div>
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">Logo</div>
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">Logo</div>
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">Logo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-4">Pengalaman Pelanggan</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-gray-800">Testimoni Pelanggan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Lihat apa kata pelanggan kami tentang produk dan layanan RoseTea Karangpring
            </p>
            <div className="w-24 h-1 bg-pink-400 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Main Featured Testimonial */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-pink-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute -top-6 left-10 text-[#e19fc6] text-7xl opacity-70 font-serif">"</div>
              <div className="absolute -bottom-6 right-10 text-[#e19fc6] text-7xl opacity-70 font-serif rotate-180">"</div>
              
              {/* Testimonial Content */}
              <div className="mb-8 relative z-10">
                <div className="flex mb-6">
                  {renderStars(testimonials[activeTestimonial].rating)}
                </div>
                <p className="text-gray-700 text-xl italic mb-8 leading-relaxed">
                  {testimonials[activeTestimonial].comment}
                </p>
                <div className="flex items-center">
                  <div className="relative">
                    <div 
                      className="w-20 h-20 rounded-full mr-5 bg-cover bg-center border-4 border-white shadow-md"
                      style={{ backgroundImage: `url(${testimonials[activeTestimonial].image})` }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-800">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-[#e19fc6] font-medium">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                <button 
                  onClick={prevTestimonial}
                  className="bg-white hover:bg-pink-50 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center border border-pink-200 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex space-x-3">
                  {testimonials.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial 
                          ? 'bg-[#e19fc6] w-6' 
                          : 'bg-gray-200 hover:bg-pink-300'
                      }`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextTestimonial}
                  className="bg-white hover:bg-pink-50 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center border border-pink-200 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Testimonials Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                onClick={() => setActiveTestimonial(testimonial.id - 1)}
                className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 cursor-pointer group 
                  hover:shadow-xl hover:-translate-y-1 ${
                  activeTestimonial === testimonial.id - 1 
                    ? 'ring-2 ring-[#e19fc6] transform scale-105' 
                    : 'hover:border-pink-100'
                }`}
              >
                <div className="absolute right-4 top-4 opacity-10 text-4xl font-serif text-pink-400 group-hover:opacity-20">"</div>
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 line-clamp-4 group-hover:text-gray-900 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-full mr-3 bg-cover bg-center border-2 border-white shadow-sm group-hover:border-pink-100"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-[#e19fc6]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Order Process Section - Cara Pemesanan */}
<section className="bg-gradient-to-b from-white to-gray-50 py-20">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <span className="bg-pink-100 text-pink-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4 inline-block">Mudah & Cepat</span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-800">Cara Pemesanan</h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Mau menikmati keharuman dan manfaat Teh Bunga Mawar Merah? Pesan sekarang dengan mudah!
      </p>
    </div>

    {/* Steps */}
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting Line (visible on larger screens) */}
        <div className="hidden lg:block absolute top-16 left-[15%] right-[15%] h-1 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 z-0"></div>
        
        {[
          {
            step: 1,
            title: "Pilih Produk",
            description: "Lihat varian teh yang tersedia di website kami atau katalog produk..",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )
          },
          {
            step: 2,
            title: "Hubungi Kami",
            description: "Klik tombol \"Pesan Sekarang\" untuk menghubungi kami",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )
          },
          {
            step: 3,
            title: "Pembayaran",
            description: "Pilih metode pembayaran yang tersedia",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            )
          },
          {
            step: 4,
            title: "Pengiriman",
            description: "Pesanan diproses dalam 1-2 hari kerja dan dikirim melalui ekspedisi terpercaya ke seluruh Indonesia.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            )
          }
        ].map((item) => (
          <div key={item.step} className="bg-white rounded-xl shadow-xl p-8 text-center relative z-10 border border-gray-100 transform transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
              {item.step}
            </div>
            <div className="flex justify-center mb-6 bg-pink-50 p-4 rounded-full mx-auto w-24 h-24 items-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* Direct Order Channels */}
    <div className="mt-20 bg-white rounded-xl shadow-xl p-10 text-center border border-gray-100">
      <span className="bg-pink-100 text-pink-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4 inline-block">Pesan Langsung</span>
      <h3 className="text-2xl font-bold mb-8 text-gray-800">Pesan Sekarang Melalui</h3>
      <div className="flex flex-wrap justify-center gap-6">
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" 
          className="flex items-center bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="mr-3">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          WhatsApp
        </a>
        <a href="#" className="flex items-center bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Shopee
        </a>
        <a href="#" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Tokopedia
        </a>
      </div>
    </div>
  </div>
</section>
{/* Product Gallery Section - Rose Tea Theme */}
<section className="bg-rose-50 py-16">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-rose-900">Galeri Produk Rose Tea</h2>
      <p className="text-rose-700 max-w-2xl mx-auto">
        Nikmati keindahan koleksi teh mawar premium kami yang dibuat dengan penuh cinta dan ketelitian.
      </p>
      <div className="w-24 h-1 bg-rose-300 mx-auto mt-6"></div>
    </div>

    {/* Gallery Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="group relative overflow-hidden rounded-xl shadow-md border border-rose-100">
          <img 
            src="/placeholder.webp" 
            alt={`Rose Tea Gallery image ${index + 1}`} 
            className="w-full h-64 object-cover transition duration-500 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900 to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
            <button className="bg-white text-rose-700 rounded-full p-3 hover:bg-rose-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
            <h4 className="font-serif font-medium text-rose-800">Rose Tea Collection {index + 1}</h4>
          </div>
        </div>
      ))}
    </div>

    {/* Process Photos */}
    <div className="mt-20">
      <h3 className="text-2xl font-serif font-bold mb-8 text-center text-rose-900">Proses Pembuatan <span className="italic">Rose Tea</span></h3>
      <div className="flex justify-center mb-10">
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Pemilihan Kelopak Mawar",
            description: "Setiap kelopak mawar dipilih dengan hati-hati saat mekar sempurna untuk mendapatkan aroma terbaik."
          },
          {
            title: "Pengolahan Lembut",
            description: "Kelopak mawar dikeringkan secara perlahan untuk mempertahankan khasiat dan warna alaminya."
          },
          {
            title: "Pengemasan Eksklusif",
            description: "Produk dikemas dalam wadah khusus yang menjaga aroma dan kelembutan teh mawar kami."
          }
        ].map((item, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-lg border border-rose-200 hover:shadow-xl transition-shadow">
            <div className="relative">
              <img 
                src="/placeholder.webp" 
                alt={item.title} 
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-4 right-4 bg-rose-100 text-rose-800 w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold">
                {index + 1}
              </div>
            </div>
            <div className="p-6 bg-white">
              <h4 className="font-serif font-bold text-xl mb-3 text-rose-800">{item.title}</h4>
              <p className="text-rose-600">{item.description}</p>
              <div className="w-12 h-1 bg-rose-200 mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Testimonial */}
    <div className="mt-20 bg-white p-8 rounded-xl shadow-md border border-rose-100">
      <div className="flex flex-col items-center">
        <svg className="h-10 w-10 text-rose-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
        </svg>
        <p className="text-rose-800 italic text-center text-lg mb-6 font-serif">
          "Rose Tea kami tidak hanya menawarkan kelezatan rasa, tetapi juga memberikan pengalaman menikmati teh yang menenangkan dan menyegarkan jiwa."
        </p>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-rose-200 flex items-center justify-center mr-3">
            <span className="text-rose-700 font-serif font-bold text-lg">A</span>
          </div>
          <div>
            <h5 className="font-medium text-rose-900">Andi Wibowo</h5>
            <p className="text-rose-500 text-sm">Tea Master</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Rosetea Contact Section with Deep Styling */}
<section className="py-16 bg-gradient-to-b from-rose-50 to-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-rose-800 mb-3">Hubungi Kami</h2>
        <div className="w-24 h-1 bg-rose-300 mx-auto mb-4"></div>
        <p className="text-rose-600">Kami siap melayani pertanyaan dan pesanan Anda</p>
      </div>
      
      {/* Contact Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Info Card */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-rose-400 h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-8 text-rose-700 flex items-center">
              <span className="bg-rose-100 text-rose-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Informasi Kontak
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="bg-rose-400 rounded-full p-3 mr-4 mt-1 shadow-sm group-hover:bg-rose-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="transform transition-all duration-300 group-hover:translate-x-2">
                  <h4 className="font-bold text-rose-700">Alamat</h4>
                  <p className="text-gray-600">Desa Karangpring, RT 003/RW 008, Sukorambi, Jember</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-rose-400 rounded-full p-3 mr-4 mt-1 shadow-sm group-hover:bg-rose-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="transform transition-all duration-300 group-hover:translate-x-2">
                  <h4 className="font-bold text-rose-700">Telepon</h4>
                  <p className="text-gray-600">+62 812-3456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-rose-400 rounded-full p-3 mr-4 mt-1 shadow-sm group-hover:bg-rose-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="transform transition-all duration-300 group-hover:translate-x-2">
                  <h4 className="font-bold text-rose-700">Email</h4>
                  <p className="text-gray-600">roseteakarangpring@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-rose-400 rounded-full p-3 mr-4 mt-1 shadow-sm group-hover:bg-rose-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="transform transition-all duration-300 group-hover:translate-x-2">
                  <h4 className="font-bold text-rose-700">Jam Operasional</h4>
                  <p className="text-gray-600">Senin - Jumat: 08.00 - 18.00<br />Sabtu: 09.00 - 16.00</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-12 pt-6 border-t border-rose-100">
              <h4 className="font-bold mb-6 text-rose-700">Ikuti Kami di Media Sosial</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="#" className="bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
                <a href="#" className="bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8m4-10v16a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2z" />
                  </svg>
                </a>
                <a href="#" className="bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white p-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Card */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-rose-400 h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-8 text-rose-700 flex items-center">
              <span className="bg-rose-100 text-rose-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Lokasi Kami
            </h3>
            <div className="rounded-lg overflow-hidden h-64 bg-rose-50 flex items-center justify-center border border-rose-100 shadow-inner relative">
              
              <div className="absolute inset-0 bg-rose-100 opacity-20"></div>
              <div className="z-10 text-center p-6">
              <br></br>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-rose-700 mb-2">Temui Kami di Toko</h4>
                <p className="text-rose-600">Kunjungi toko fisik kami untuk pengalaman berbelanja yang lebih menyenangkan</p>
                <button className="mt-6 bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-full transition-colors duration-300 flex items-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.832L9 5l5.447-2.724A1 1 0 0115 5.618v10.764a1 1 0 01-1.553.832L9 19l-5.447 2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.832L9 5l5.447-2.724A1 1 0 0115 5.618v10.764a1 1 0 01-1.553.832L9 19l-5.447 2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.832L9 5l5.447-2.724A1 1 0 0115 5.618v10.764a1 1 0 01-1.553.832L9 19l-5.447 2.724A1 1 0 013 16.382V5.618" />
                  </svg>
                  Dapatkan Arah
                </button>
               <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default App
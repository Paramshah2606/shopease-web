'use client';

import { fetchCollection, fetchBlog } from "@/api/apiHandler";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function HomePage(request) {
  console.log("REquest in home", request);
  const [collections, setCollections] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    getCollections();
    getBlogs();
    
    // Mouse tracking for interactive elements
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Scroll animation
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  async function getCollections() {
    let res = await fetchCollection();
    if (res.code == 1) {
      setCollections(res.data.collections);
    } else {
      toast.error(res.message);
    }
  }

  async function getBlogs() {
    let res = await fetchBlog();
    if (res.code == 1) {
      setBlogs(res.data.blogs);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden relative">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`,
            backgroundSize: '100% 100%',
            transition: 'background-image 0.3s ease'
          }}
        ></div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-float"></div>
      </div>

      {/* Glassmorphism Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ${scrollY > 50 ? 'bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-8 py-4 shadow-2xl shadow-purple-500/10' : 'bg-transparent px-4 py-2'}`}>
        <div className="flex items-center justify-between w-full max-w-5xl">
          <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-shimmer">
            ShopEase
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="relative group text-white/80 hover:text-white transition-all duration-300">
              <span className="relative z-10">Home</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#collections" className="relative group text-white/80 hover:text-white transition-all duration-300">
              <span className="relative z-10">Collections</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#blogs" className="relative group text-white/80 hover:text-white transition-all duration-300">
              <span className="relative z-10">Blog</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            
            {/* Enhanced Settings Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/10 backdrop-blur-sm group"
              >
                <div className="relative">
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span className="font-medium">Settings</span>
              </button>
              
              {showSettings && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 py-3 animate-slideDown">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Account</p>
                  </div>
                  
                  {[
                    { icon: "💝", label: "My Wishlist", color: "text-pink-400" },
                    { icon: "👤", label: "Edit Profile", color: "text-blue-400" },
                    { icon: "🔐", label: "Change Password", color: "text-green-400" },
                    { icon: "📦", label: "Order History", color: "text-yellow-400" }
                  ].map((item, idx) => (
                    <a key={idx} href="#" className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-all duration-200 group">
                      <span className="text-lg">{item.icon}</span>
                      <span className={`text-white group-hover:${item.color} transition-colors duration-200`}>{item.label}</span>
                    </a>
                  ))}
                  
                  <div className="border-t border-white/10 mt-2 pt-2">
                    <a href="#" className="flex items-center space-x-3 px-4 py-3 hover:bg-red-500/10 transition-all duration-200 text-red-400 group">
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      <span>Logout</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Animations */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10 relative">
            <div className="space-y-6">
              <div className="overflow-hidden">
                <h1 className="text-7xl md:text-8xl font-black leading-none animate-slideUp">
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-shimmer">
                    DISCOVER
                  </span>
                  <span className="block text-white/90 mt-2 animate-slideUp" style={{animationDelay: '0.2s'}}>
                    THE FUTURE
                  </span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-slideUp animate-shimmer" style={{animationDelay: '0.4s'}}>
                    OF SHOPPING
                  </span>
                </h1>
              </div>
              
              <div className="overflow-hidden">
                <p className="text-xl text-white/70 leading-relaxed max-w-lg animate-slideUp" style={{animationDelay: '0.6s'}}>
                  Experience next-generation e-commerce with cutting-edge technology, lightning-fast delivery, and premium quality products curated just for you.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 animate-slideUp" style={{animationDelay: '0.8s'}}>
              <Link href='/user/product' className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Now 
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </Link>
              
              <button className="group px-8 py-4 border-2 border-white/20 hover:border-purple-400/50 rounded-2xl font-bold text-lg text-white hover:bg-white/5 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Learn More</span>
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="flex gap-12 pt-8 animate-slideUp" style={{animationDelay: '1s'}}>
              {[
                { number: "50K+", label: "Happy Customers", color: "from-purple-400 to-pink-400" },
                { number: "1000+", label: "Premium Products", color: "from-pink-400 to-purple-400" },
                { number: "99%", label: "Satisfaction Rate", color: "from-purple-400 to-blue-400" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm font-medium mt-1 group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative z-10">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse-slow"></div>
              
              <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/20 group-hover:border-white/30 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
                  alt="Hero Banner"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating elements */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg animate-float opacity-80"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg animate-float-slower opacity-80"></div>
                <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg animate-float opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section with Modern Design */}
      <section id="collections" data-animate className="max-w-7xl mx-auto px-8 py-32">
        <div className={`transition-all duration-1000 ${isVisible.collections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              ✨ FEATURED COLLECTIONS
            </div>
            <h2 className="text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Curated Excellence
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Handpicked collections that define luxury, style, and innovation. Each piece tells a story of craftsmanship and modern design.
            </p>
          </div>

          {!collections ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-pink-500/30 border-b-pink-500 rounded-full animate-spin-reverse"></div>
              </div>
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No collections found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {collections.map((c, index) => (
                <div 
                  key={c.id} 
                  className="group relative animate-slideUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2">
                    <div className="text-center">
                      <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <img 
                          src={c.cover_image} 
                          alt={c.name} 
                          className="relative w-32 h-32 rounded-full object-cover border-4 border-white/20 mx-auto shadow-2xl" 
                        />
                      </div>
                      
                      <Link href={`/user/collection/${c.id}`}>
                        <h3 className="font-bold text-2xl text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-4">
                          {c.name}
                        </h3>
                      </Link>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                          Explore Collection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ultra Modern Why Shop Section */}
      <section id="features" data-animate className="max-w-7xl mx-auto px-8 py-32">
        <div className={`transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              🚀 WHY SHOPEASE
            </div>
            <h2 className="text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next-Gen Shopping
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We&apos;re not just another e-commerce platform. We&apos;re your gateway to the future of retail.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Quantum Speed Delivery",
                description: "Experience delivery redefined with our AI-powered logistics network. Same-day delivery in major cities, real-time tracking with AR visualization.",
                features: ["AI-optimized routes", "Drone delivery zones", "Real-time AR tracking", "Carbon-neutral shipping"],
                color: "from-blue-500 to-cyan-500",
                glowColor: "blue-500"
              },
              {
                icon: "🛡️",
                title: "Fort Knox Security",
                description: "Military-grade encryption meets seamless user experience. Your data and transactions are protected by quantum-resistant security protocols.",
                features: ["Quantum encryption", "Biometric authentication", "Zero-knowledge payments", "Instant fraud detection"],
                color: "from-purple-500 to-pink-500",
                glowColor: "purple-500"
              },
              {
                icon: "🎯",
                title: "AI Personal Shopper",
                description: "Meet your AI shopping assistant that learns your style, predicts your needs, and curates personalized recommendations with 99.7% accuracy.",
                features: ["Neural style analysis", "Predictive recommendations", "Voice shopping assistant", "Smart wardrobe planning"],
                color: "from-pink-500 to-red-500",
                glowColor: "pink-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative animate-slideUp"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500 h-full">
                  <div className="flex flex-col h-full">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-${feature.glowColor}/25`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className={`font-black text-2xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-white/60 group-hover:text-white/80 transition-colors duration-300">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section with Modern Cards */}
      <section id="blogs" data-animate className="max-w-7xl mx-auto px-8 py-32">
        <div className={`transition-all duration-1000 ${isVisible.blogs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-between mb-20">
            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                📝 LATEST INSIGHTS
              </div>
              <h2 className="text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Trending Stories
                </span>
              </h2>
              <p className="text-xl text-white/60">
                Stay ahead with insider knowledge and trending insights
              </p>
            </div>
            
            <Link 
              href="/user/blog" 
              className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl font-bold text-white shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                View All Stories
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
            </Link>
          </div>

          {!blogs ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No Blogs Found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((b, index) => (
                <div
                  key={b.id}
                  className="group relative bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-lg rounded-3xl overflow-hidden border border-slate-300/20 hover:border-slate-300/40 transition-all duration-500 hover:transform hover:scale-105"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={b.cover_image}
                      alt={`Blog: ${b.topic}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                      {b.created_date}
                    </div>
                  </div>
                  
                  <div className="relative p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {Array.isArray(b.tags) && b.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={tag + idx} 
                          className="bg-gradient-to-r from-slate-400/20 to-blue-400/20 text-slate-300 text-xs px-3 py-1 rounded-full font-semibold border border-slate-300/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="font-bold text-xl text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-300 group-hover:to-blue-300 group-hover:bg-clip-text transition-all duration-300">
                      {b.topic}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                      {b.short_description}...
                    </p>
                    
                    <a
                      href={`/user/blog/${b.id}`}
                      className="inline-flex items-center gap-2 text-slate-300 font-semibold text-sm hover:text-blue-300 transition-colors duration-300 group-hover:translate-x-1"
                    >
                      Read More
                      <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-16 border border-white/20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Start Shopping?
              </span>
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover the perfect products for your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href='/user/product' className="px-8 py-4 bg-gradient-to-r from-slate-500 to-blue-500 bg-opacity-80 hover:bg-opacity-100 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-slate-400/15 transition-all duration-300 transform hover:scale-105 text-white">
                Explore Products
              </Link>
              <button className="px-8 py-4 border-2 border-slate-300/20 hover:border-slate-300/40 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
}
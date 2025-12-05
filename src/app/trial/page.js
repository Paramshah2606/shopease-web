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

  useEffect(() => {
    getCollections();
    getBlogs();
    
    // Scroll animation
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
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
    <div className="bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 min-h-screen text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-300 rounded-full mix-blend-soft-light filter blur-2xl opacity-8 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-soft-light filter blur-2xl opacity-6 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-400 rounded-full mix-blend-soft-light filter blur-2xl opacity-4 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Floating Navigation */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/20 backdrop-blur-xl border border-slate-300/20 rounded-2xl px-8 py-3' : 'bg-transparent px-4 py-2'}`}>
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-300 to-blue-300 bg-clip-text text-transparent">
            ShopEase
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-slate-300 transition-all duration-300 hover:scale-110">Home</a>
            <a href="#" className="hover:text-slate-300 transition-all duration-300 hover:scale-110">Collections</a>
            <a href="#" className="hover:text-slate-300 transition-all duration-300 hover:scale-110">Blog</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fadeInUp">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-300 via-blue-300 to-slate-300 bg-clip-text text-transparent animate-gradient">
                  Discover
                </span>
                <br />
                <span className="text-white">the Latest</span>
                <br />
                <span className="bg-gradient-to-r from-blue-300 to-slate-400 bg-clip-text text-transparent">
                  Trends
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Shop exclusive collections, top categories, and the newest arrivals—all in one place with premium quality and lightning-fast delivery.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href='/user/product' className="group relative px-8 py-4 bg-gradient-to-r from-slate-500 to-blue-500 bg-opacity-80 hover:bg-opacity-100 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-slate-400/15 transition-all duration-300 transform hover:scale-105 text-center text-white">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-slate-300 to-blue-300 bg-clip-text text-transparent">50K+</div>
                <div className="text-gray-400 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-slate-400 bg-clip-text text-transparent">1000+</div>
                <div className="text-gray-400 text-sm">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-slate-400 to-blue-400 bg-clip-text text-transparent">99%</div>
                <div className="text-gray-400 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 animate-float">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
                alt="Hero Banner"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-slate-400 to-blue-400 opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-slate-500 opacity-10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" data-animate className="max-w-7xl mx-auto px-8 py-20">
        <div className={`transition-all duration-1000 ${isVisible.collections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-300 to-blue-300 bg-clip-text text-transparent">
                Featured Collections
              </span>
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Discover our handpicked collections designed to match your style and preferences
            </p>
          </div>

          {!collections ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No collections found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {collections.map((c, index) => (
                <div 
                  key={c.id} 
                  className="group relative bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-lg rounded-3xl p-8 border border-slate-300/20 hover:border-slate-300/40 transition-all duration-500 hover:transform hover:scale-105"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-400/5 to-blue-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <img 
                        src={c.cover_image} 
                        alt={c.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white/20 group-hover:border-slate-300/50 transition-all duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <Link href={`/user/collection/${c.id}`}>
                      <h3 className="font-bold text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-300 group-hover:to-blue-300 group-hover:bg-clip-text transition-all duration-300">
                        {c.name}
                      </h3>
                    </Link>
                    
                    <div className="mt-4 px-6 py-2 bg-gradient-to-r from-slate-400/20 to-blue-400/20 rounded-full border border-slate-300/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="text-sm text-white">Explore Collection</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Shop Section */}
      <section id="features" data-animate className="max-w-7xl mx-auto px-8 py-20">
        <div className={`transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-300 to-blue-300 bg-clip-text text-transparent">
                Why Shop with ShopEase?
              </span>
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Experience the future of online shopping with our premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚚",
                title: "Lightning Fast Delivery",
                description: "Get your orders delivered to your doorstep in record time with our trusted logistics partners. Real-time tracking keeps you in control.",
                highlight: "Free shipping on your first order!",
                gradient: "from-slate-400 to-blue-400"
              },
              {
                icon: "🔒",
                title: "Secure & Flexible Payments",
                description: "Shop with confidence using encrypted payments. Choose from cards, UPI, net banking, or cash on delivery—always safe, always simple.",
                highlight: "100% payment protection. No hidden fees.",
                gradient: "from-blue-400 to-slate-500"
              },
              {
                icon: "⭐",
                title: "Top-Rated Quality",
                description: "Only the best for you. Every product is handpicked and quality checked. Enjoy easy returns and dedicated support for a worry-free experience.",
                highlight: "7-day hassle-free returns.",
                gradient: "from-slate-500 to-blue-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                                  className="group relative bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-lg rounded-3xl p-8 border border-slate-300/20 hover:border-slate-300/40 transition-all duration-500 hover:transform hover:scale-105"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-white/20 to-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-5xl">{feature.icon}</span>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-300 group-hover:to-blue-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-auto">
                    <p className={`font-semibold text-sm bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.highlight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blogs" data-animate className="max-w-7xl mx-auto px-8 py-20">
        <div className={`transition-all duration-1000 ${isVisible.blogs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Latest from Our Blog
                </span>
              </h2>
              <p className="text-gray-300 text-xl">
                Stay updated with the latest trends and insights
              </p>
            </div>
            <Link 
              href="/user/blog" 
              className="group px-8 py-4 bg-gradient-to-r from-slate-500 to-blue-500 bg-opacity-80 hover:bg-opacity-100 rounded-full font-semibold hover:shadow-2xl hover:shadow-slate-400/15 transition-all duration-300 transform hover:scale-105 text-white"
            >
              <span className="flex items-center gap-2">
                View All Blogs
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
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
'use client';

import { fetchCollection, fetchBlog } from "@/api/apiHandler";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function HomePage(request) {
  const [collections, setCollections] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Hero refs and state
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

  // Refs for other sections (collections, features, blogs)
  const collectionsRef = useRef(null);
  const featuresRef = useRef(null);
  const blogsRef = useRef(null);

  useEffect(() => {
    getCollections();
    getBlogs();

    // Scroll event handler: update scrollY
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection observer for hero visibility
    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (heroRef.current) heroObserver.observe(heroRef.current);

    // Intersection observer for other sections visibility
    const sectionsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe collections, features, blogs sections as they have data-animate ids
    if (collectionsRef.current) sectionsObserver.observe(collectionsRef.current);
    if (featuresRef.current) sectionsObserver.observe(featuresRef.current);
    if (blogsRef.current) sectionsObserver.observe(blogsRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      heroObserver.disconnect();
      sectionsObserver.disconnect();
    };
  }, []);

  async function getCollections() {
    const res = await fetchCollection();
    if (res.code === 1) {
      setCollections(res.data.collections);
    } else {
      toast.error(res.message);
    }
  }

  async function getBlogs() {
    const res = await fetchBlog();
    if (res.code === 1) {
      setBlogs(res.data.blogs);
    } else {
      toast.error(res.message);
    }
  }

  // Limit parallax offset to max 70px
  const parallax = Math.min(scrollY, 70);

  // Helper to compute parallax translateY style: smaller effect if not visible for smooth entrance
  // Translate upwards on scroll but starts from +20px offset when invisible
  function parallaxStyle(visible) {
    return {
      transform: visible
        ? `translateY(${-parallax * 0.15}px)`
        : 'translateY(20px)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    };
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 min-h-screen text-white overflow-x-hidden relative">
      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-10"
          style={{ animation: "orbFloat1 18s ease-in-out infinite" }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-400 rounded-full mix-blend-soft-light filter blur-2xl opacity-7" 
          style={{ animation: "orbFloat2 20s ease-in-out infinite" }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-44 bg-blue-200 rounded-full rotate-12 mix-blend-soft-light filter blur-xl opacity-5"
          style={{ animation: "orbFloat3 22s ease-in-out infinite" }}
        />
      </div>

      {/* Navigation */}
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
      <section
        id="hero"
        ref={heroRef}
        data-animate
        className="relative min-h-screen flex items-center justify-center px-8 pt-20"
        style={{
          transition: "opacity 0.9s ease, transform 0.9s ease",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(12px)'
        }}
      >
        <div
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          style={{
            transform: `translateY(${-parallax * 0.3}px)`
          }}
        >
          {/* Left text block with parallax */}
          <div
            className="space-y-8"
            style={{
              transition: "transform 0.6s cubic-bezier(.25,.6,.53,1), opacity 0.7s",
              transform: `translateY(${parallax * 0.18}px) scale(${1 - parallax * 0.002})`,
              opacity: heroVisible ? 1 : 0
            }}
          >
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

          {/* Right hero image with parallax */}
          <div
            className="relative"
            style={{
              transition: "transform 0.7s cubic-bezier(.25,.6,.53,1), opacity 0.7s",
              transform: `translateY(${-parallax * 0.3}px) scale(${1 + parallax * 0.0008})`,
              opacity: heroVisible ? 1 : 0
            }}
          >
            <div className="relative z-10 animate-float">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
                alt="Hero Banner"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                draggable="false"
              />
            </div>
            {/* Floating gradients */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-slate-400 to-blue-400 opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-slate-500 opacity-10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </section>

      {/* Collections Section with parallax */}
      <section
        id="collections"
        ref={collectionsRef}
        data-animate
        className="max-w-7xl mx-auto px-8 py-20"
        style={parallaxStyle(isVisible.collections)}
      >
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

      {/* Why Shop Section with parallax */}
      <section
        id="features"
        ref={featuresRef}
        data-animate
        className="max-w-7xl mx-auto px-8 py-20"
        style={parallaxStyle(isVisible.features)}
      >
        <div className={`transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-300 to-blue-300 bg-clip-text text-transparent">
                Why Shop with ShopEase?
              </span>
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Unbeatable advantages, crafted for you.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
            {/* Feature cards (unchanged) */}
            {/* ... your feature cards JSX here unchanged ... */}
            <div className="group flex-1 flex flex-col gap-3 items-center bg-gradient-to-br from-white/10 via-blue-900/10 to-slate-400/15 backdrop-blur-xl rounded-3xl p-8 border border-blue-300/10 hover:border-blue-400/30 shadow-xl/10 hover:shadow-2xl transition-all duration-400 max-w-md mx-auto relative before:content-[''] before:absolute before:left-5 before:top-[-16px] before:w-3 before:h-3 before:rounded-full before:bg-blue-400/80">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-tr from-slate-400/50 via-blue-400/30 to-blue-200/20 shadow-lg mb-3">
                <svg className="w-9 h-9 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                  <path d="M6 17V7a2 2 0 012-2h8a2 2 0 012 2v10" />
                  <path d="M6 17a2 2 0 002 2h8a2 2 0 002-2"/>
                  <path d="M9 12h6"/>
                </svg>
              </div>
              <div className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent">
                Fast & Free Delivery
              </div>
              <div className="text-gray-300 text-center text-base">
                Get your orders lightning fast. Enjoy free delivery on your first purchase!
              </div>
            </div>
            <div className="group flex-1 flex flex-col gap-3 items-center bg-gradient-to-br from-white/10 via-blue-900/10 to-slate-400/15 backdrop-blur-xl rounded-3xl p-8 border border-blue-300/10 hover:border-blue-400/30 shadow-xl/10 hover:shadow-2xl transition-all duration-400 max-w-md mx-auto relative before:content-[''] before:absolute before:right-5 before:top-[-16px] before:w-3 before:h-3 before:rounded-full before:bg-green-400/80">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-tr from-blue-300/40 via-slate-400/30 to-blue-400/10 shadow-lg mb-3">
                <svg className="w-9 h-9 text-green-200" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                  <path d="M12 17v-1" />
                  <path d="M16 21H8a1 1 0 01-1-1v-4a2 2 0 012-2h6a2 2 0 012 2v4a1 1 0 01-1 1z" />
                  <path d="M12 17a4 4 0 00-4-4V8a4 4 0 018 0v5a4 4 0 00-4 4z" />
                </svg>
              </div>
              <div className="text-xl font-semibold bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent">
                Secure & Flexible Payments
              </div>
              <div className="text-gray-300 text-center text-base">
                Multiple payment options with full protection. Safe, private, easy checkout.
              </div>
            </div>
            <div className="group flex-1 flex flex-col gap-3 items-center bg-gradient-to-br from-white/10 via-blue-900/10 to-slate-400/15 backdrop-blur-xl rounded-3xl p-8 border border-blue-300/10 hover:border-blue-400/30 shadow-xl/10 hover:shadow-2xl transition-all duration-400 max-w-md mx-auto relative before:content-[''] before:absolute before:left-1/2 before:top-[-16px] before:-translate-x-1/2 before:w-3 before:h-3 before:rounded-full before:bg-purple-400/80">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-tr from-purple-200/40 via-blue-400/20 to-blue-600/10 shadow-lg mb-3">
                <svg className="w-9 h-9 text-purple-200" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
                </svg>
              </div>
              <div className="text-xl font-semibold bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                Top-Rated Quality
              </div>
              <div className="text-gray-300 text-center text-base">
                Only premium, verified products. Easy returns, always support by your side.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section with parallax */}
      <section
        id="blogs"
        ref={blogsRef}
        data-animate
        className="max-w-7xl mx-auto px-8 py-20"
        style={parallaxStyle(isVisible.blogs)}
      >
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

      {/* CTA Section (unchanged, matching your theme) */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="relative bg-gradient-to-r from-slate-800/70 via-blue-900/60 to-slate-700/80 backdrop-blur-lg rounded-3xl p-16 border border-slate-400/15 text-center overflow-hidden shadow-xl/10">
          {/* Subtle animated blue orb background */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl animate-orbGlow"></div>
          <div className="absolute -bottom-20 right-0 w-64 h-64 bg-slate-300/10 rounded-full filter blur-2xl animate-orbGlow2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-300 via-blue-300 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Ready to Start Shopping?
              </span>
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover the perfect products for your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href='/user/product'
                className="group px-8 py-4 bg-gradient-to-r from-slate-500 to-blue-500 bg-opacity-80 hover:bg-opacity-100 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-300/10 transition-all duration-300 transform hover:scale-105 text-white focus-visible:outline-2 outline-blue-400 relative"
              >
                <span className="relative z-10">Explore Products</span>
                {/* Optional animated sparkle */}
                <span className="absolute -top-2 left-1/2 w-3 h-3 bg-gradient-to-tr from-blue-300 via-slate-200 to-white rounded-full blur-sm opacity-0 group-hover:opacity-70 transition-all duration-300"></span>
              </Link>
              <button
                className="px-8 py-4 border-2 border-blue-300/20 hover:border-blue-400/40 rounded-full font-semibold text-lg hover:bg-blue-400/5 transition-all duration-300 backdrop-blur-sm text-white focus-visible:outline-2 outline-blue-400"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Keyframe Styles */}
      <style jsx>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translateY(0px) scale(1);}
          50% { transform: translateY(50px) scale(1.07);}
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translateY(0px) scale(1);}
          50% { transform: translateY(-40px) scale(1.12);}
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translateX(0px);}
          50% { transform: translateX(-44px);}
        }
        @keyframes orbGlow {
          0%,100% { opacity: 0.10; filter: blur(52px);}
          60% { opacity: 0.17; filter: blur(82px);}
        }
        @keyframes orbGlow2 {
          0%,100% { opacity: 0.12; filter: blur(30px);}
          45% { opacity: 0.18; filter: blur(60px);}
        }
        .animate-orbGlow { animation: orbGlow 8s ease-in-out infinite; }
        .animate-orbGlow2 { animation: orbGlow2 11s ease-in-out infinite;}
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-20px);}
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

'use client';
import { fetchCollection ,fetchBlog} from "@/api/apiHandler";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function HomePage(request) {
  console.log("REquest in home",request);
  const [collections,setCollections]=useState(null);
  const [blogs,setBlogs]=useState(null);
  useEffect(()=>{
    getCollections();
    getBlogs()
  },[]);

  async function getCollections(){
    let res=await fetchCollection();
    if(res.code==1){
      setCollections(res.data.collections);
    }else{
      toast.error(res.message);
    }
  }

  async function getBlogs(){
    let res=await fetchBlog();
    if(res.code==1){
      setBlogs(res.data.blogs);
    }else{
      toast.error(res.message);
    }
  }
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen pt-4">
      <div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-[80%] mx-auto">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Discover the Latest Trends
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Shop exclusive collections, top categories, and the newest arrivals—all in one place.
          </p>
          <Link href='/user/product' className="px-8 py-3 bg-blue-400 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition">
            Shop Now
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
          alt="Hero Banner"
          className="w-120 h-86 object-cover rounded-3xl shadow-2xl hidden md:block"
        />
      </section>

      {/* Collections */}
      <section className="max-w-[80%] mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Collections</h2>
        {!collections ? <p>Fetching Collections</p> : collections.length==0 ? <p>No collections found</p> : 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {collections.map((c)=>(
              <div key={c.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <img src={c.cover_image} alt="Collection 1" className="w-32 h-32 rounded-full mb-4 object-cover" />
                 <Link href={`/user/collection/${c.id}`}><h3 className="font-semibold text-lg text-blue-900">{c.name}</h3></Link>
              </div>
            ))}
        </div>}
      </section>


      <section className="max-w-[80%] mx-auto px-8 py-14">
  <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
    Why Shop with ShopEase?
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Fast Delivery */}
    <div className="bg-gradient-to-br from-white/90 to-blue-100/60 rounded-2xl shadow-xl p-8 flex flex-col items-center min-h-[320px] border border-blue-100">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 shadow">
        <span className="text-4xl text-blue-500">🚚</span>
      </div>
      <h3 className="font-semibold text-lg mb-3 text-blue-700 text-center">Lightning Fast Delivery</h3>
      <p className="text-gray-600 text-center mb-2">
        Get your orders delivered to your doorstep in record time with our trusted logistics partners. Real-time tracking keeps you in control.
      </p>
      <p className="text-blue-500 font-medium text-sm mt-auto text-center">
        Free shipping on your first order!
      </p>
    </div>
    {/* Secure Payments */}
    <div className="bg-gradient-to-br from-white/90 to-blue-100/60 rounded-2xl shadow-xl p-8 flex flex-col items-center min-h-[320px] border border-blue-100">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 shadow">
        <span className="text-4xl text-blue-500">🔒</span>
      </div>
      <h3 className="font-semibold text-lg mb-3 text-blue-700 text-center">Secure & Flexible Payments</h3>
      <p className="text-gray-600 text-center mb-2">
        Shop with confidence using encrypted payments. Choose from cards, UPI, net banking, or cash on delivery—always safe, always simple.
      </p>
      <p className="text-blue-500 font-medium text-sm mt-auto text-center">
        100% payment protection. No hidden fees.
      </p>
    </div>
    {/* Quality Products */}
    <div className="bg-gradient-to-br from-white/90 to-blue-100/60 rounded-2xl shadow-xl p-8 flex flex-col items-center min-h-[320px] border border-blue-100">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 shadow">
        <span className="text-4xl text-blue-500">⭐</span>
      </div>
      <h3 className="font-semibold text-lg mb-3 text-blue-700 text-center">Top-Rated Quality</h3>
      <p className="text-gray-600 text-center mb-2">
        Only the best for you. Every product is handpicked and quality checked. Enjoy easy returns and dedicated support for a worry-free experience.
      </p>
      <p className="text-blue-500 font-medium text-sm mt-auto text-center">
        7-day hassle-free returns.
      </p>
    </div>
  </div>
</section>





      {/* Blog Highlights */}
      <section className="max-w-[80%] mx-auto px-6 py-10">
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Latest from Our Blog</h2>
    <Link href="/user/blog" className="px-5 py-2 bg-blue-700 text-white font-semibold rounded-full text-sm hover:bg-blue-900 transition">
      View All Blogs
    </Link>
  </div>
  {!blogs ? (
    <div className="flex justify-center py-10"><span>Fetching Blogs...</span></div>
  ) : blogs.length === 0 ? (
    <div className="flex justify-center py-10"><span>No Blogs Found</span></div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogs.slice(0, 3).map((b) => (
        <div
          key={b.id}
          className="flex flex-col group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer h-full overflow-hidden border border-blue-100"
        >
          <div className="relative h-44">
            <img
              src={b.cover_image}
              alt={`Blog visual: ${b.topic}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute top-3 right-3 bg-white/90 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow">
              {b.created_date}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex flex-wrap gap-1 mb-1">
              {Array.isArray(b.tags) && b.tags.slice(0, 3).map((tag, idx) => (
                <span key={tag + idx} className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold">{tag}</span>
              ))}
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2 mt-1 group-hover:text-blue-700 transition">
              {b.topic}
            </h3>
            <p className="text-gray-600 text-sm mb-5 flex-1">{b.short_description}...</p>
            <a
              href={`/user/blog/${b.id}`}
              className="mt-auto text-blue-700 font-semibold text-sm hover:underline transition inline-flex items-center gap-1"
            >
              Read More
              <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  )}
</section>


    </div>
  );
}

"use client";
import { fetchWishlist,manageWishlist,manageCart } from "@/api/apiHandler";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const router=useRouter();

  useEffect(() => {
    handleWishlist();
  }, []);

  async function handleWishlist(){
    let res=await fetchWishlist();
    if(res.code==1){
      setWishlist(res.data);
    }else{
      toast.error(res.message);
    }
  }

  const handleAddToCart = async (product_combination_id) => {
     let res=await manageCart({action:"inc",product_combination_id});
    if(res.code==1){
      toast.success(res.message);
      handleWishlist();
    }else{
      toast.error(res.message);
    }
  };

  function goToCart(){
    router.push('/user/cart');
  }

  const handleRemove = async (product_combination_id) => {
    let res=await manageWishlist({product_combination_id});
    if(res.code==1){
      toast.info(res.message);
      handleWishlist();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-6 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-800">My Wishlist</h1>
          <p className="text-gray-600 text-sm mt-2">
            Items you’ve liked and saved for later.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
  {/* Illustration/Icon */}
  <div className="mb-6">
    <svg width="96" height="96" fill="none" viewBox="0 0 96 96">
      <ellipse cx="48" cy="80" rx="32" ry="8" fill="#E5ECFF"/>
      <path d="M67.5 28C62.18 28 57.5 32.03 57.5 37C57.5 41.23 60.62 44.32 65.12 48.11C66.45 49.22 67.97 50.54 69.63 52.1C71.29 50.54 72.81 49.22 74.13 48.11C78.62 44.32 81.75 41.23 81.75 37C81.75 32.03 77.07 28 71.75 28C69.37 28 67.31 29.11 65.97 31.08C64.63 29.11 62.56 28 60.18 28H67.5Z" fill="#A7C7FC"/>
      <rect x="32" y="40" width="32" height="40" rx="16" fill="#D1E7FF"/>
      <ellipse cx="48" cy="80" rx="28" ry="6" fill="#F1F5FD"/>
      <ellipse cx="48" cy="85" rx="22" ry="3" fill="#E5ECFF"/>
    </svg>
  </div>
  {/* Headline */}
  <h2 className="text-2xl font-bold text-blue-800 mb-2">
    Your wishlist is feeling lonely!
  </h2>
  {/* Subtext/explanation */}
  <p className="text-gray-600 mb-6 max-w-sm text-center">
    Save your favorite products to your wishlist—then find them easily whenever you’re ready to shop again!
  </p>
  {/* CTA */}
  <Link
    href="/user/product"
    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-base"
  >
    Start Browsing
  </Link>
</div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
  <div
    key={item.product_combination_id}
    className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl border border-blue-100 p-5 flex gap-5"
  >
    <img
      src={item.cover_image}
      alt={item.name}
      className="w-32 h-32 object-cover rounded-xl border"
    />
    <div className="flex flex-col justify-between w-full">
      <div>
        <h3 className="text-lg font-bold text-blue-900">{item.name}</h3>
        {/* Color & Size display */}
        {(item.color || item.size) && (
          <div className="flex items-center gap-4 mt-1 text-xs">
            {item.color && (
              <div className="flex items-center gap-1">
                <span
                  className="inline-block w-4 h-4 rounded-full border border-gray-200 mr-1"
                  style={{ backgroundColor: item.color.code || item.color.hex || item.color }}
                  title={item.color.name || item.color}
                />
                <span className="text-gray-500">
                  {item.color.name || item.color}
                </span>
              </div>
            )}
            {item.size && (
              <div className="flex items-center gap-1">
                <span className="text-gray-400">Size:</span>
                <span className="bg-gray-100 py-0.5 px-2 rounded text-xs text-gray-800 font-medium">
                  {item.size.name || item.size}
                </span>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      </div>

      <div className="flex justify-between items-end mt-4">
        <div className="text-sm">
          <p className="font-medium text-blue-700 text-base">₹{item.price}</p>
          <p
            className={`text-xs mt-1 ${
              item.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {item.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="flex gap-3">
          {Number(item.in_cart) > 0 ? (
            <button
              onClick={goToCart}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition bg-green-600 text-white hover:bg-green-700`}
            >
              <FiShoppingCart /> Go to Cart
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(item.product_combination_id)}
              disabled={item.stock === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                item.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiShoppingCart />
              {item.stock > 0 ? "Add to Cart" : "Unavailable"}
            </button>
          )}

          <button
            onClick={() => handleRemove(item.product_combination_id)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-semibold text-sm"
          >
            <FiTrash2 />
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
))}

          </div>
        )}
      </div>
    </div>
  );
}

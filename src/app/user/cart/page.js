"use client";
import { useEffect, useState ,} from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { fetchCart, manageCart } from "@/api/apiHandler";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router=useRouter();

  useEffect(()=>{
    getCart();
  },[]);

    async function getCart(){
        let res=await fetchCart();
        if(res.code==1){
            setCart(res.data);
        }else{
          toast.error(res.message);
        }
    }

  const increaseQty = async (id) => {
    let res=await manageCart({action:"inc",product_combination_id:id});
    if(res.code==0){
      toast.error(res.message);
    }
    getCart();
  };

  const decreaseQty = async (id) => {
    let res=await manageCart({action:"dec",product_combination_id:id});
    if(res.code==0){
      toast.error(res.message);
    }
    getCart();
  };

  const deleteItem = async (id) => {
    let res=await manageCart({action:"del",product_combination_id:id});
    if(res.code==0){
      toast.error(res.message);
    }
    getCart();
  };

  const clearCart = async () => {
    let res=await manageCart({action:"clear"});
    if(res.code==0){
      toast.error(res.message);
    }
    setCart([]);
    getCart();
  }

  function goToCheckOut(){
    router.push("/user/checkout");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-4">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 p-8 mt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <svg width="96" height="96" fill="none" viewBox="0 0 96 96" className="mb-6">
              <circle cx="48" cy="48" r="46" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
              <path d="M61 61l14 14" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="48" cy="48" r="18" stroke="#3B82F6" strokeWidth="4"/>
            </svg>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Your cart is empty</h2>
            <Link
              href="/user/product"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-blue-100">
              {cart.map((item) => (
  <div
    key={item.product_combination_id}
    className="flex items-center gap-6 py-6"
  >
    <img
      src={item.cover_image}
      alt={item.name}
      className="w-20 h-20 object-cover rounded-xl border border-blue-100"
    />
    <div className="flex-1 min-w-0">
      <div className="text-lg font-semibold text-gray-800 truncate">{item.name}</div>
      {/* Color & Size row (if available) */}
      {(item.color || item.size) && (
        <div className="flex items-center gap-4 mt-1 text-sm">
          {item.color &&
            <div className="flex items-center gap-1">
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-200 mr-1"
                style={{ backgroundColor: item.color.code || item.color.hex || item.color }}
                title={item.color.name || item.color}
              />
              <span className="text-gray-500">{item.color.name || item.color}</span>
            </div>
          }
          {item.size &&
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Size:</span>
              <span className="bg-gray-100 py-0.5 px-2 rounded text-xs text-gray-800 font-medium">
                {item.size.name || item.size}
              </span>
            </div>
          }
        </div>
      )}
      <div className="text-blue-600 font-bold text-md mt-1">₹{item.price}</div>
    </div>
    {/* Quantity Controls */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => decreaseQty(item.product_combination_id)}
        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg flex items-center justify-center hover:bg-blue-200 transition"
      >
        –
      </button>
      <span className="px-2 text-lg text-black">{item.quantity}</span>
      <button
        onClick={() => increaseQty(item.product_combination_id)}
        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-lg flex items-center justify-center hover:bg-blue-200 transition"
      >
        +
      </button>
    </div>
    {/* Delete */}
    <button
      onClick={() => deleteItem(item.product_combination_id)}
      className="ml-4 text-red-500 hover:text-red-700 transition"
      aria-label="Remove item"
    >
      <FaTrash />
    </button>
  </div>
))}

            </div>
            {/* Cart Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
              <button
                onClick={clearCart}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Clear Cart
              </button>
              <div className="text-xl font-bold text-gray-800">
                Total: <span className="text-blue-700">₹{cart[0].sub_total}</span>
              </div>
              <button
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
                disabled={cart.length === 0}
                onClick={goToCheckOut}
              >
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

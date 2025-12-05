"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiLock, FiTrash2, FiLogOut, FiHeart, FiBox, FiMapPin, FiCreditCard, FiSettings } from "react-icons/fi";
import { toast } from "react-toastify";
import { logOut,deleteAccount } from "@/api/apiHandler";
import Swal from 'sweetalert2'

export default function UserPanel() {
  const router = useRouter();

  async function handleLogout() {
    let res=await logOut();
    if(res.code==1){
      toast.success(res.message);
      router.push("/login");
    }else{
      toast.error(res.message);
    }
  }

  async function handleAccountDelete() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    // Show loading spinner
    Swal.fire({
      title: "Deleting your account...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await deleteAccount();

      Swal.close(); // Close loading state

      if (res.code === 1) {
        await Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
        });
        router.push("/goodbye");
      } else {
        await Swal.fire({
          title: "Error",
          text: res.message || "Failed to delete account. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.close();
      console.error("Account deletion failed:", error);
      await Swal.fire({
        title: "Error",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  }
}



  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-3">
    <div className="py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl bg-white/90 shadow-2xl border border-blue-100 p-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-purple-400 rounded-full p-3">
            <FiUser className="text-white text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, User!</h1>
            <p className="text-gray-500 text-sm">Manage your account and preferences</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Controls */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <FiSettings className="text-blue-400" /> Profile Settings
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/user/edit-profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-gray-700">
                  <FiUser /> Edit Profile
                </Link>
              </li>
              <li>
                <Link href="/user/change-password" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-gray-700">
                  <FiLock /> Change Password
                </Link>
              </li>
              <li>
                <button onClick={handleAccountDelete} className="flex w-full items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-100 transition font-medium text-red-600">
                  <FiTrash2 /> Delete Account
                </button>
              </li>
            </ul>
          </div>
          {/* Orders & Preferences */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
              <FiBox className="text-purple-400" /> Orders & Preferences
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/user/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-100 transition font-medium text-gray-700">
                  <FiBox /> My Orders
                </Link>
              </li>
              <li>
                <Link href="/user/wishlist" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-100 transition font-medium text-gray-700">
                  <FiHeart /> My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/user/address" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-100 transition font-medium text-gray-700">
                  <FiMapPin /> My Addresses
                </Link>
              </li>
              <li>
                <Link href="/user/card" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-100 transition font-medium text-gray-700">
                  <FiCreditCard /> My Cards
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-600"
                >
                  <FiLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-400 text-sm">
          Need help?{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

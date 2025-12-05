"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMapPin, FiEdit2, FiTrash2, FiPlus,FiArrowLeft } from "react-icons/fi";
import { fetchAddress, deleteAddress } from "@/api/apiHandler";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter();

  // Fetch addresses on mount
  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
      setLoading(true);
      const res = await fetchAddress();
      if (res.code === 1) {
        setAddresses(res.data.address);
      } else {
        setAddresses([]);
      }
      setLoading(false);
    }

  async function handleDelete(id) {
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
      Swal.fire({
        title: "Deleting your address...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    const res = await deleteAddress({address_id:id});
    Swal.close();
    if (res.code === 1) {
      await Swal.fire({
            title: "Deleted!",
            text: "Your address has been deleted.",
            icon: "success",
          });
      getAddresses();
    } else {
      await Swal.fire({
            title: "Error",
            text: res.message || "Failed to delete address. Please try again.",
            icon: "error",
          });
    }
  }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-3">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8 mt-8">
        <button
          type="button"
          onClick={() => router.push("/user/menu")}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition"
        >
          <FiArrowLeft /> Back
        </button>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiMapPin className="text-blue-500" /> My Addresses
          </h1>
          <Link
            href="/user//address/add"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <FiPlus /> Add New
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            Loading addresses...
          </div>
        ) : addresses.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-gray-400">
            No addresses found. Add your first address!
          </div>
        ) : (
          <div className="space-y-6">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <div className="font-semibold text-gray-700">
                    {addr.first_name} {addr.last_name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {addr.address}, {addr.city}, {addr.state} {addr.zip}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Phone: {addr.phone}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/user/address/edit/${addr.id}`}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium"
                  >
                    <FiEdit2 /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

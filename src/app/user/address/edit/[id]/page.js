"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { editAddress, fetchAddress } from "@/api/apiHandler";
import { FiArrowLeft } from "react-icons/fi";


// Validation schema
const validationSchema = Yup.object({
  first_name: Yup.string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .matches(/^[A-Za-z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes")
    .required("First name is required"),

  last_name: Yup.string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .matches(/^[A-Za-z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes")
    .required("Last name is required"),

  address: Yup.string()
    .trim()
    .max(100, "Address must be at most 100 characters"),

  city: Yup.string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters")
    .matches(/^[A-Za-z\s'-]+$/, "City can only contain letters, spaces, hyphens, and apostrophes")
    .required("City is required"),

  state: Yup.string()
    .trim()
    .required("State is required"),

  zip: Yup.string()
    .trim()
    .matches(/^\d{5}(-\d{4})?$/, "Zip must be a valid US ZIP code (e.g., 12345 or 12345-6789)")
    .required("Zip is required"),

  phone: Yup.string()
    .trim()
    .matches(/^[+\d][\d\s-]{8,}$/, "Enter a valid phone number")
    .required("Phone is required"),
});

export default function EditAddressForm() {
  const router = useRouter();
  const {id}=useParams();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(id){
        handleAddress({address_id:id});
    }
  },[id]);

  async function handleAddress(data){
    let res=await fetchAddress(data);
    if(res.code==1){
        let address=res.data.address[0];
        formik.setFieldValue('first_name',address.first_name);
        formik.setFieldValue('last_name',address.last_name);
        formik.setFieldValue('address',address.address);
        formik.setFieldValue('city',address.city);
        formik.setFieldValue('state',address.state);
        formik.setFieldValue('zip',address.zip);
        formik.setFieldValue('phone',address.phone);
    }
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let res=await editAddress({...values,address_id:id});
      console.log(res);
      if(res.code==1){
        toast.success(res.message);
        router.push("/user/address");
      }else{
        toast.error(res.message);
      }
      formik.resetForm();
      setLoading(false);
    },
  });

  return (
    <div className=" bg-gradient-to-br flex justify-center from-blue-50 to-blue-100 pt-3 ">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden bg-white/40 backdrop-blur-lg border border-white/30 mt-8">
        <div className="p-8 sm:p-12 bg-white/70 backdrop-blur-lg">
        <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition"
          >
            <FiArrowLeft /> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Edit Address</h2>
          <p className="text-center text-gray-500 mb-6">
            Update your address details below.
          </p>
          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.first_name && formik.errors.first_name ? "border-red-400" : ""
                  }`}
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.first_name}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.last_name && formik.errors.last_name ? "border-red-400" : ""
                  }`}
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.last_name}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                rows={2}
                placeholder="Street, Apartment, etc."
                className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400`}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
              )}
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.city && formik.errors.city ? "border-red-400" : ""
                  }`}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.state && formik.errors.state ? "border-red-400" : ""
                  }`}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.state}</p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  placeholder="Zip"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.zip && formik.errors.zip ? "border-red-400" : ""
                  }`}
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.zip && formik.errors.zip && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.zip}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.phone && formik.errors.phone ? "border-red-400" : ""
                  }`}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? "Updating..." : "Update Address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

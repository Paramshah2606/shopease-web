"use client";
import { useState, useRef,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiCamera, FiUser, FiMail, FiPhone } from "react-icons/fi";
import { toast } from "react-toastify";
import { editProfile, fetchUserDetail,uploadImage } from "@/api/apiHandler";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const router=useRouter();

  useEffect(()=>{
    handleGetUser()
  },[]);

  async function handleGetUser(){
    let res=await fetchUserDetail();
    if(res.code==1){
        formik.setFieldValue('full_name',res.data.user.full_name);
        formik.setFieldValue('email',res.data.user.email);
        formik.setFieldValue('phone',res.data.user.phone);
        setPhoto(res.data.user.profile_photo);
        setOriginalPhoto(res.data.user.profile_photo); 
        if(res.data.user.login_type!='N'){
            setLoginNormal(false);
        }
    }
  }

  const [photo, setPhoto] = useState();
  const [originalPhoto, setOriginalPhoto] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginNormal,setLoginNormal]=useState(true);
  const fileInputRef = useRef();

  // Form validation schema
  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[+\d][\d\s-]{8,}$/, "Enter a valid phone number")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
        const photoChanged = photo !== originalPhoto;
        let profile_photo;
        console.log(profile_photo);
        if(photoChanged){
            let formdata=new FormData();
            console.log("Selected file",imageFile);
            formdata.append('image',imageFile);
            let res=await uploadImage(formdata);
            if(res.code==1){
                profile_photo=res.data.image;
            }
        }
        let data={
            full_name:values.full_name,
            profile_photo
        }
        let res2=await editProfile(data);
        setLoading(false);
        if(res2.code==1){
            toast.success(res2.message);
            router.push("/user/menu");
        }else{
            toast.error(res2.message);
        }
    },
  });

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file); 
      }
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl border border-blue-100 rounded-3xl p-8">
        {/* Profile Photo with Pencil Icon */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative">
            <img
              src={photo}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow"
            />
            {/* Pencil Icon Overlay */}
            <button
              type="button"
              className="absolute bottom-2 right-2 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition flex items-center justify-center"
              onClick={() => fileInputRef.current.click()}
              aria-label="Change photo"
            >
              <FiCamera size={18} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-gray-700 ${
                  formik.touched.full_name && formik.errors.full_name
                    ? "border-red-400"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-blue-400 bg-white/90 placeholder-gray-400 transition`}
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.full_name}
                disabled={loading}
              />
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            </div>
            {formik.touched.full_name && formik.errors.full_name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.full_name}</p>
            )}
          </div>

          {/* Email */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Email
  </label>
  <div className="relative flex items-center">
    <input
      className={`w-full pl-10 pr-24 py-3 rounded-xl border text-gray-700 ${
        formik.touched.email && formik.errors.email
          ? "border-red-400"
          : "border-gray-200"
      } focus:ring-2 focus:ring-blue-400 bg-white/90 placeholder-gray-400 transition cursor-not-allowed`}
      type="email"
      name="email"
      placeholder="Enter your email"
      value={formik.values.email}
      disabled
      readOnly
    />
    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
    {loginNormal && (
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-xs shadow-sm border border-blue-200 focus:outline-none"
        onClick={() => {router.push("/user/edit-profile/update-email")}}
      >
        Change
      </button>
    )}
  </div>
  {formik.touched.email && formik.errors.email && (
    <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
  )}
</div>

{/* Phone */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Phone
  </label>
  <div className="relative flex items-center">
    <input
      className={`w-full pl-10 pr-24 py-3 rounded-xl border text-gray-700 ${
        formik.touched.phone && formik.errors.phone
          ? "border-red-400"
          : "border-gray-200"
      } focus:ring-2 focus:ring-blue-400 bg-white/90 placeholder-gray-400 transition cursor-not-allowed`}
      type="text"
      name="phone"
      placeholder="Enter your phone"
      value={formik.values.phone}
      disabled
      readOnly
    />
    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
    {loginNormal && (
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-xs shadow-sm border border-blue-200 focus:outline-none"
        onClick={() => {router.push("/user/edit-profile/update-phone")}}
      >
        Change
      </button>
    )}
  </div>
  {formik.touched.phone && formik.errors.phone && (
    <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
  )}
</div>


          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

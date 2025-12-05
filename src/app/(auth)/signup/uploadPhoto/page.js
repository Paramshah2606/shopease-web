"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUpload,uploadImage } from "@/api/apiHandler";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function UploadPhoto() {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile,setUploadFile]=useState();
  const router = useRouter();
  const [loading,setLoading]=useState(false)

  const handleFileChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    console.warn("No file selected.");
    return;
  }

  if (!file.type.startsWith("image/")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please upload a valid image file.",
    });
    return;
  }

  // Preview the selected image
  const previewURL = URL.createObjectURL(file);
  setSelectedFile(previewURL);
  setUploadFile(file);
};

  const handleUpload =async () => {
    setLoading(true);
    let formdata=new FormData();
    console.log("Selected file",selectedFile);
    formdata.append('image',uploadFile);
    let res=await uploadImage(formdata);
    if(res.code==1){
        let profile_photo=res.data.image;
        let user_id=localStorage.getItem("user_id");
        let res2=await signupUpload({profile_photo,user_id});
        setLoading(false);
        if(res2.code==1){
          toast.success(res2.message);
          localStorage.removeItem('user_id');
          localStorage.removeItem('signup_step');
          router.replace("/user/home"); 
        }else{
          toast.error(res2.message);
        }
    }else{
        setLoading(false);
        toast.error(res.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Your Profile Photo</h2>
        <p className="text-gray-600 mb-8">Add a photo to personalize your account.</p>

        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center border-4 border-dashed border-blue-300 rounded-xl h-48 mb-6 hover:border-blue-500 transition"
        >
          {selectedFile ? (
            <img
              src={selectedFile}
              alt="Selected Profile"
              className="w-40 h-40 object-cover rounded-full"
            />
          ) : (
            <div className="flex flex-col items-center text-blue-400">
              <svg
                className="w-12 h-12 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M7 16v-4a4 4 0 118 0v4" />
                <circle cx="12" cy="17" r="4" />
              </svg>
              <span>Click or drag to upload</span>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg ${
            !selectedFile ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
        {loading ? "Uploading..." : "Upload Photo"}
        </button>

      </div>
    </div>
  );
}

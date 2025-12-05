"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductDetail,manageCart,manageWishlist,fetchProductInCart } from "@/api/apiHandler";
import { FiHeart } from "react-icons/fi";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart,setInCart]=useState(false);
  const [inWishlist,setInWishlist]=useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if(id){
      getProductDetail(id)
    }
  }, [id]);

  useEffect(()=>{
    if(product){
      fetchWishlist();
    }
  },[product,selectedColor,selectedSize]);

  useEffect(() => {
  if (product && selectedColor && selectedSize) {
    checkIfVariantInCart();
  }
}, [product,selectedColor, selectedSize]);

  async function getProductDetail(product_id) {
    const res = await fetchProductDetail({product_id});
    if (res.code === 1) {
      setProduct(res.data);
      setSelectedColor(res.data.selected_info.color_id);
      setSelectedSize(res.data.selected_info.size_id);
      setSelectedImage(res.data.cover_image);
      // setInCart(Number(res.data.in_cart));
    }
  }

  async function checkIfVariantInCart() {
  const combination_id = product.all_variants_stock.find(
    (variant) =>
      variant.size_list_id === selectedSize && variant.color_id === selectedColor
  )?.product_combination_id;

  if (!combination_id) {
    setInCart(0);
    return;
  }

  const res = await fetchProductInCart({ product_combination_id: combination_id });
  if (res.code === 1) {
    setInCart(res.data.in_cart);
  }
}

  async function addToCart(){
    let combination_id=product.all_variants_stock.find((variant)=>{
      if(variant.size_list_id==selectedSize && variant.color_id==selectedColor){
        return variant.product_combination_id
      }
    })?.product_combination_id;
    let res=await manageCart({action:"inc",product_combination_id:combination_id});
    setInCart(1);
    console.log(res);
  }

  function goToCart(){
    router.push('/user/cart');
  }

  async function handleWishlist(){
    let combination_id=product.all_variants_stock.find((variant)=>{
      if(variant.size_list_id==selectedSize && variant.color_id==selectedColor){
        return variant.product_combination_id
      }
    })?.product_combination_id;
    
    let res=await manageWishlist({product_combination_id:combination_id});
    if(res.code==1){
      if(res.data){
        setInWishlist(true);
      }else{
        setInWishlist(false);
      }
    }
  }

  async function fetchWishlist(){
    let combination_id=product.all_variants_stock.find((variant)=>{
      if(variant.size_list_id==selectedSize && variant.color_id==selectedColor){
        return variant.product_combination_id
      }
    })?.product_combination_id;
    const res = await manageWishlist({
      product_combination_id: combination_id,
      action:"R"
    });
    if(res.code==1){
      setInWishlist(res.data)
    }
    console.log(res.data);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-blue-600 text-lg">Loading product...</span>
      </div>
    );
  }

  // Build image gallery
  const images = [
    product.cover_image,
    ...(product.gallery_images || []).map((img) =>
      img.startsWith("http") ? img : `/gallery/${img}`
    ),
  ];

  // --- Size availability logic ---
  // For the selected color, get available sizes (stock > 0)
  const sizesWithStock = product.sizes.map((size) => {
    const variant = product.all_variants_stock.find(
      (v) => v.color_id === selectedColor && v.size_list_id === size.id
    );
    return {
      ...size,
      inStock: variant ? variant.stock > 0 : false,
    };
  });

  // When color changes, ensure selected size is available
  function handleColorChange(newColorId) {
    setSelectedColor(newColorId);
    // Find available sizes for this color
    const availableSizes = product.sizes.filter((size) => {
      const variant = product.all_variants_stock.find(
        (v) => v.color_id === newColorId && v.size_list_id === size.id
      );
      console.log(variant);
      return variant && variant.stock > 0;
    });

    console.log(availableSizes);
    // If current selectedSize is not available, select first available or null
    if (!availableSizes.some((size) => size.id === selectedSize)) {
      setSelectedSize(availableSizes.length > 0 ? availableSizes[0].id : null);
    }
  }

  
  const activeVariant = product.all_variants_stock.find(
    (v) => v.color_id === selectedColor && v.size_list_id === selectedSize
  );
  const inStock = activeVariant ? activeVariant.stock > 0 : false;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen pt-3">
      <section className="max-w-5xl mx-auto mt-10 bg-white/80 backdrop-blur-lg border border-blue-100 shadow-xl rounded-2xl p-10 flex flex-col md:flex-row gap-10">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="w-full h-96 bg-white rounded-xl shadow flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex gap-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Gallery ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded-lg border border-blue-100 bg-white shadow cursor-pointer hover:scale-105 transition ${
                  selectedImage === img ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 flex flex-row justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <button
      onClick={handleWishlist}
      className="text-2xl transition transform hover:scale-110"
      aria-label="Toggle Wishlist"
    >
      <FiHeart
        className={inWishlist ? "text-red-500" : "text-black"}
        fill={inWishlist ? "red" : "none"}
        stroke={inWishlist ? "red" : "black"}
        size={28}
      />
    </button>
          </div>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <div className="flex gap-4 items-center mt-2">
            <span className="text-2xl font-bold text-blue-700">
              ₹{product.selected_info.price}
            </span>
          </div>

          {/* Color Selection */}
          <div>
            <div>
  <div className="font-semibold text-gray-700 mb-2">Color:</div>
  <div className="flex gap-3">
    {product.colors.map((color) => (
      <button
        key={color.id}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition font-medium ${
          selectedColor === color.id
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
        }`}
        onClick={() => handleColorChange(color.id)}
      >
        {/* Color Swatch */}
        <span
          className="inline-block w-5 h-5 rounded-full border border-gray-300"
          style={{
            backgroundColor:
              color.hex || color.code || color.color || "#ccc", // Use a hex/code property if available
          }}
        ></span>
        {/* Color Name */}
        {color.color}
      </button>
    ))}
  </div>
</div>

          </div>

          {/* Size Selection */}
          <div>
            <div className="font-semibold text-gray-700 mb-2">Size:</div>
            <div className="flex gap-3">
              {sizesWithStock.map((size) => (
                <button
                  key={size.id}
                  disabled={!size.inStock}
                  className={`px-4 py-2 rounded-lg border transition font-medium ${
                    selectedSize === size.id
                      ? "bg-blue-600 text-white border-blue-600 cursor-pointer"
                      : size.inStock
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      : "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  }`}
                  onClick={() => size.inStock && setSelectedSize(size.id)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          {/* Materials & Care */}
          <div className="flex flex-col md:flex-row gap-8 mt-2">
            <div>
              <div className="font-semibold text-gray-700">Materials</div>
              <div className="text-gray-600">{product.materials}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Care</div>
              <div className="text-gray-600">{product.care}</div>
            </div>
          </div>

          {/* Add to Cart Button */}
          {!inCart ? 
          <button
            disabled={!inStock}
            onClick={addToCart}
            className={`mt-6 px-8 py-3 rounded-xl font-semibold text-lg shadow transition ${
              inStock
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button> : <button
            disabled={!inCart}
            onClick={goToCart}
            className={`mt-6 px-8 py-3 rounded-xl font-semibold text-lg shadow transition  bg-green-600 text-white hover:bg-green-800 cursor-pointer`}
          >View Cart</button>
          
}
        </div>
      </section>
    </div>
  );
}

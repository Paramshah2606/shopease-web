'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiTag } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import { fetchCollection } from '@/api/apiHandler';

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [collection,setCollection]=useState([]);
  const {id}=useParams();

  useEffect(() => {
    if(id){
        handleCollection();
    }
  }, []);

  async function handleCollection(){
    let res=await fetchCollection({collection_id:id});
    if(res.code==1){
        setProducts(res.data.products);
        setCollection(res.data.collection);
    }else{
        toast.error(res.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-16">
      <div className="relative max-w-[70%] mx-auto rounded-3xl overflow-hidden mt-8 shadow-2xl">
        {/* Banner Image */}
        {collection.cover_image && (
          <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden">
            <img
              src={collection.cover_image}
              alt={collection.name}
              className="w-full h-full object-cover object-center brightness-75"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

            {/* Text over banner */}
            <div className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-10 pb-10 z-20">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white/80 rounded-full shadow">
                  <FiTag className="text-blue-700 text-xl" />
                </div>
                <span className="text-md text-white font-semibold tracking-wide">
                  Collection
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-2">
                {collection.name}
              </h1>
              <p className="text-white/90 max-w-2xl text-base md:text-lg leading-6 md:leading-7">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 💠 Product Grid */}
      <div id="collection-grid" className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg font-medium">No products available in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/80 backdrop-blur-md border border-blue-100 shadow-xl rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition duration-300 group"
              >
                <Link href={`/user/product/${product.id}`} className="block">
                  {/* Product Image */}
                  <div className="overflow-hidden h-60 w-full">
                    <img
                      src={product.cover_image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-blue-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 text-sm rounded-xl">
                        ₹{product.price}
                      </span>
                      <span className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

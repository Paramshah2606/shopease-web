"use client";
import { useState, useEffect } from "react";
import {
  fetchCategory,
  fetchProduct,
  fetchSubCategory,
  fetchTag,
  fetchBrand
} from "@/api/apiHandler";
import TagMultiSelect from "@/components/TagMultiSelect";
import Link from "next/link";

const filtersInitial = {
  category_id: "",
  sub_category_id: "",
  brand_id: "",
  tag_id: "",
  tag_ids: [],
  suitable_for: "",
  search_term: "",
};

export default function ShopPage() {
  const [filters, setFilters] = useState(filtersInitial);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [search,setSearch]=useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    getProducts();
    getCategory();
    getTag();
    getBrand();
    if (filters.category_id != "") {
      getSubCategory({ category_id: filters.category_id });
    }
  }, [filters, pagination.page]);

  useEffect(()=>{

  },[])

  async function getProducts() {
    const res = await fetchProduct({ ...filters, ...pagination });
    if (res.code === 1) {
      setProducts(res.data.products);
      setPagination({
        page: res.data.page,
        totalPages: res.data.totalPages,
        limit: res.data.limit,
        total: res.data.total,
      });
    }
  }

  async function getCategory() {
    const res = await fetchCategory();
    if (res.code === 1) setCategories(res.data);
  }

  async function getSubCategory(data) {
    const res = await fetchSubCategory(data);
    if (res.code === 1) setSubCategories(res.data);
  }

  async function getTag() {
    const res = await fetchTag();
    if (res.code === 1) setTags(res.data);
  }

   async function getBrand() {
    let data={
      category_id:filters.category_id,
      sub_category_id:filters.sub_category_id
    }
    const res = await fetchBrand(data);
    if (res.code === 1) setBrands(res.data);
  }

  function handleFilterChange(e) {
    if (e.target.name === "category_id") {
      setFilters({ ...filtersInitial, [e.target.name]: e.target.value });
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }
    setPagination({ ...pagination, page: 1 });
  }

  function handleSearch(e) {
    e.preventDefault();
    setFilters({ ...filters, search_term: search });
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  function handlePageChange(newPage) {
    setPagination({ ...pagination, page: newPage });
  }

  function resetFilters(){
    setFilters({...filtersInitial});
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen pt-3">

      {/* Filter Section */}
      <section className="max-w-[80%] mx-auto mt-8 mb-8">
        <div className="w-full bg-white/80 backdrop-blur-lg border border-blue-100 shadow-xl rounded-2xl px-6 py-5 flex flex-wrap gap-4 items-center justify-between relative z-50">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              name="category_id"
              value={filters.category_id}
              onChange={handleFilterChange}
              className="appearance-none bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition hover:border-blue-400"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg fill='none' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%2360A5FA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25em 1.25em",
              }}
            >
              <option value="">All Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {filters.category_id && (
              <select
                name="sub_category_id"
                value={filters.sub_category_id}
                onChange={handleFilterChange}
                className="appearance-none bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition hover:border-blue-400"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg fill='none' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%2360A5FA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.25em 1.25em",
                }}
              >
                <option value="">All Sub Category</option>
                {subCategories.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.name}
                  </option>
                ))}
              </select>
            )}

            <select
              name="brand_id"
              value={filters.brand_id}
              onChange={handleFilterChange}
              className="appearance-none bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition hover:border-blue-400"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg fill='none' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%2360A5FA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25em 1.25em",
              }}
            >
              <option value="">Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>

            {/* Fixed TagMultiSelect */}
            <div className="relative z-[999]">
              <TagMultiSelect
                tags={tags}
                selectedTags={filters.tag_ids}
                setSelectedTags={(arr) =>
                  setFilters({ ...filters, tag_ids: arr })
                }
              />
            </div>

            <select
              name="tag_id"
              value={filters.tag_id}
              onChange={handleFilterChange}
              className="appearance-none bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition hover:border-blue-400"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg fill='none' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%2360A5FA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25em 1.25em",
              }}
            >
              <option value="">Tag</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.tag}
                </option>
              ))}
            </select>

            <select
              name="suitable_for"
              value={filters.suitable_for}
              onChange={handleFilterChange}
              className="appearance-none bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 pr-10 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition hover:border-blue-400"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg fill='none' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%2360A5FA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25em 1.25em",
              }}
            >
              <option value="">Suitable For</option>
              <option value="'M'">Men</option>
              <option value="'F'">Women</option>
              <option value="'C'">Kids</option>
            </select>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white/70 border border-blue-100 rounded-xl overflow-hidden shadow-sm"
          >
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="px-4 py-2 bg-transparent text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="h-full px-5 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[80%] mx-auto py-10">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full flex justify-center">
  <div className="flex flex-col items-center py-16">
    {/* Illustration */}
    <svg
      width="96"
      height="96"
      fill="none"
      viewBox="0 0 96 96"
      className="mb-6"
    >
      <circle cx="48" cy="48" r="46" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
      <path d="M61 61l14 14" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="48" cy="48" r="18" stroke="#3B82F6" strokeWidth="4"/>
    </svg>
    <h2 className="text-2xl font-semibold text-blue-700 mb-2">No products found</h2>
    <p className="text-gray-500 mb-6 text-center max-w-xs">
      We couldn’t find any products matching your filters.<br/>
      Try adjusting your search or removing some filters.
    </p>
    <button
      onClick={resetFilters}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
    >
      Reset Filters
    </button>
  </div>
</div>



          ) : (
            products.map((product) => {
              const inStock = product.total_stock > 0;
              return (
                <div
                  key={product.id}
                  className="flex flex-col bg-white rounded-xl shadow-md transition hover:shadow-xl"
                >
                  <div className="relative w-full h-60">
                    <img
                      src={product.cover_image}
                      alt={product.name}
                      className={`w-full h-full object-cover z-0 rounded-t-xl ${
                        inStock ? "rounded-t-xl" : "grayscale opacity-60"
                      }`}
                    />
                    {!inStock &&
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold 
                          bg-gray-300 text-gray-600"
                    >
                      Out of stock
                    </div>
                  }
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-blue-600 font-bold text-xl">
                        ₹{product.price}
                      </span>
                      {inStock ? <Link href={`/user/product/${product.id}`} className={`px-4 py-2 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700`}>View Details</Link> :<></>
                      }
                      
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Pagination */}
      {products.length > 0 && (
      <section className="max-w-[80%] mx-auto flex justify-center gap-2 mt-10 pb-8">
        {Array.from({ length: pagination.totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              pagination.page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-200"
            } transition`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </section>)
    }
    </div>
  );
}

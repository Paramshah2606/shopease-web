'use client';
import { useState, useEffect } from "react";
import { fetchBlog } from "@/api/apiHandler";
import { useRouter } from "next/navigation";


const DEFAULT_LIMIT = 10;

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT); // You can make this user-selectable if needed
  const [totalPages, setTotalPages] = useState(1);
  const router=useRouter();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await fetchBlog({page,limit:9});
        setBlogs(res.data.blogs || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        setBlogs([]);
        setTotalPages(1);
        setTotalBlogs(0);
      }
      setLoading(false);
    })();
  }, [page, limit]);

  const handleNext = () => setPage((p) => (p < totalPages ? p + 1 : p));
  const handlePrev = () => setPage((p) => (p > 1 ? p - 1 : p));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">All Blogs</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="text-lg text-gray-600">Loading blogs...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex justify-center py-20">
            <span className="text-lg text-gray-600">No blogs found.</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <article
                  key={b.id}
                  className="bg-white rounded-2xl shadow p-6 flex flex-col hover:shadow-xl transition cursor-pointer"
                  onClick={() => window.location.href = `/user/blog/${b.id}`}
                >
                  <img
                    src={b.cover_image}
                    alt={`Cover for ${b.topic}`}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Array.isArray(b.tags) && b.tags.length>0 && b.tags.map((tag, idx) => (
                      <span key={tag + idx} className="bg-blue-100 text-blue-600 text-xs px-3 py-0.5 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{b.topic}</h2>
                  <p className="text-gray-600 text-sm mb-3">{b.short_description}...</p>
                  <time className="text-gray-400 text-xs mb-2">{b.created_date}</time>
                  <button
                    className="mt-auto self-start text-blue-600 font-semibold hover:underline text-sm"
                    onClick={() => {
                      router.push(`/user/blog/${b.id}`)
                    }}
                  >
                    Read More →
                  </button>
                </article>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-4 py-2 rounded-full font-semibold shadow ${
                  page === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-700 text-white hover:bg-blue-900'
                }`}
              >
                Previous
              </button>
              <span className="font-medium text-blue-900">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-full font-semibold shadow ${
                  page === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-700 text-white hover:bg-blue-900'
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

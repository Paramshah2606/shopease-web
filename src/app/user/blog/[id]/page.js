'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchBlogDetail } from '@/api/apiHandler';

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchBlogDetail({ blog_id:id })
      .then(res => {
        if (res && res.data) setBlog(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-2 py-10">
      <main className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-24">
            <span className="text-blue-700 font-bold text-xl">Loading Blog...</span>
          </div>
        ) : !blog ? (
          <div className="flex justify-center py-24">
            <span className="text-red-500 font-bold text-xl">Blog not found.</span>
          </div>
        ) : (
          <article className="bg-white border border-[#F5F5F5] rounded-3xl shadow-xl p-4 md:p-10">
            {/* Cover image */}
            <div className="mb-7 relative">
              <img
                src={blog.cover_image}
                alt={blog.topic}
                className="w-full h-56 md:h-72 rounded-2xl shadow-sm object-cover"
              />
            </div>

            {/* Title and meta */}
            <div className="mb-3">
              <h1 className="text-3xl font-extrabold text-[#262626] mb-2 leading-snug">{blog.topic}</h1>
              <div className="text-sm text-[#908F9B] mb-1 flex items-center gap-2">
                <svg width="18" height="18" fill="none" className="inline-block text-yellow-400 mr-1"><circle cx="9" cy="9" r="9" fill="#FFF685"/></svg>
                {blog.created_date}
              </div>
            </div>

            {/* Blog content */}
            <div className="prose max-w-none text-[#222C36] prose-h3:text-lg prose-h3:text-[#1976D2] prose-strong:text-[#222C36]">
              {
                blog.description
                  ? blog.description.split('\n').map((line, idx) =>
                      line.trim() === "" ? (
                        <div key={idx} className="my-3"></div>
                      ) : (
                        <p key={idx} className={idx === 0 ? "text-lg font-medium" : ""}>{line}</p>
                      )
                    )
                  : <p className="text-[#72788D]">No description provided.</p>
              }
            </div>
            {/* Back button */}
            <div className="mt-10 flex">
              <button
                className="text-white bg-[#1976D2] hover:bg-[#1256a0] font-semibold px-5 py-2 rounded-full shadow transition"
                onClick={() => router.push('/user/blog')}
              >
                ← Back to Blogs
              </button>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}

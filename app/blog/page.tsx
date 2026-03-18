"use client";

import { useBlogPosts } from "@/hooks/useBlogPosts";
import Navbar from "@/components/Navbar";
import Link from 'next/link';

export default function BlogPage() {
  const { posts, loading } = useBlogPosts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Navbar />
        <div className="text-lg md:text-xl text-gray-600">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="pt-10 pb-8">
        <div className="page-container">
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-500 bg-clip-text text-transparent mb-6">
              Rescue Blog
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stories of hope, rescue updates, and adoption journeys from The Saver team
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-28">
              <div className="card p-16 max-w-md mx-auto">
                <p className="text-3xl text-gray-500 mb-4">No stories yet</p>
                <p className="text-lg text-gray-600 mb-8">Stay tuned for our first rescue update!</p>
                <Link
                  href="/admin/blog"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3"
                >
                  🖋️ Manage Posts
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 lg:space-y-8">
              {posts.map((post) => (
                <article key={post.id} className="group/card">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="card flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-all duration-300 hover:md:-translate-y-2">
                      <div className="aspect-[3/2] md:aspect-[4/3] w-full md:w-48 lg:w-64 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50">
                        {post.image ? (
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-primary-500 flex items-center justify-center p-3">
                            <span className="text-lg lg:text-xl text-white font-bold drop-shadow-lg">{post.category}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-6 flex flex-col flex-1">
                        <span className="inline-block px-2 py-1 bg-gradient-to-r from-orange-100 to-primary-100 text-orange-800 rounded-lg text-xs font-semibold mb-2 tracking-wide">
                          {post.category}
                        </span>
                        <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover/card:text-orange-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm lg:text-base text-gray-600 mb-3 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-orange-600 font-semibold text-xs lg:text-sm group-hover/card:translate-x-1 transition-all">
                          Read full story →
                        </div>
                      </div>

                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}


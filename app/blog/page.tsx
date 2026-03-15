"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const q = query(
        collection(db, 'blog-posts'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen py-20 flex justify-center items-center'>
        <div className='text-lg text-gray-500'>Loading blog posts...</div>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="page-container">
        <div className="text-center mb-20 lg:mb-28">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-primary-500 bg-clip-text text-transparent mb-6">
            Rescue Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stories of hope, rescue updates, and adoption journeys from The Saver team
          </p>
        </div>

        {loading ? (
          <div className="card p-20 text-center max-w-2xl mx-auto">
            <div className="text-2xl text-gray-500 animate-pulse">Loading rescue stories...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-28">
            <div className="card p-16 max-w-md mx-auto">
              <p className="text-3xl text-gray-500 mb-4">No stories yet</p>
              <p className="text-lg text-gray-600">Stay tuned for our first rescue update!</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((post) => (
              <article key={post.id} className="group/card h-full">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="card h-full flex flex-col">
                    <div className="aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary-50 to-orange-50">
                      {/* Placeholder image - replace with post.image if available */}
                      <div className="w-full h-full bg-gradient-to-br from-primary-400 to-orange-500 flex items-center justify-center">
                        <span className="text-2xl text-white font-bold drop-shadow-lg">{post.category}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-8 flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-orange-100 text-primary-800 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight group-hover/card:text-primary-600 transition-colors duration-400 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 flex-1 line-clamp-3 mb-8 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center mt-auto text-primary-600 font-semibold group-hover/card:translate-x-2 transition-transform duration-300">
                        Read full story →
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
  
        {posts.length > 0 && (
          <div className="text-center mt-20">
            <Link href="/admin/blog" className="btn-primary text-lg px-12 py-4 inline-flex items-center gap-3">
              🖋️ Manage Blog Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}


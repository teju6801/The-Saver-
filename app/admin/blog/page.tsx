"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])

  async function fetchPosts() {
    const snapshot = await getDocs(collection(db, "blog-posts"))

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setPosts(data)
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return;
    await deleteDoc(doc(db, "blog-posts", id))
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>

        <Link
          href="/admin/blog/new"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          ➕ New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-2xl text-gray-500 mb-4">No blog posts yet</p>
          <Link
            href="/admin/blog/new"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {post.category} • {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'No date'}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


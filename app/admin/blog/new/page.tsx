"use client"

import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function NewBlogPost() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")

      await addDoc(collection(db, "blog-posts"), {
        title,
        slug,
        content,
        category,
        excerpt: content.slice(0, 160) + '...',
        author: "Admin",
        published: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      router.push("/admin/blog")
    } catch (err) {
      alert('Error creating post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 p-2 -ml-2 rounded-lg hover:bg-gray-100"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          New Blog Post
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg placeholder-gray-500 transition-all duration-200"
              placeholder="Enter a descriptive title for your post..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500 transition-all duration-200"
              placeholder="e.g., Adoption, Rescue Story, Tips"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Content
            </label>
            <textarea
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical text-base placeholder-gray-500 transition-all duration-200 font-light"
              placeholder="Write your blog post here... Use markdown for formatting (## Heading, *italic*, **bold**)"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


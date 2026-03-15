"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      const postRef = doc(db, 'blog-posts', id);
      const snapshot = await getDoc(postRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setPost(data);
        setTitle(data.title || '');
        setContent(data.content || '');
        setCategory(data.category || '');
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const slug = title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      await updateDoc(doc(db, 'blog-posts', id), {
        title,
        content,
        category,
        slug,
        excerpt: content.slice(0, 140) + '...',
        updatedAt: new Date()
      });
      router.push('/admin/blog');
    } catch (err) {
      alert('Error saving post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-4xl mx-auto p-8'>
      <div className='flex justify-between items-center mb-8'>
        <Link href='/admin/blog' className='text-orange-600 hover:text-orange-700'>
          ← Back to Posts
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50'
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Title
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Category
          </label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Content
          </label>
          <textarea
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 resize-vertical'
          />
        </div>
      </div>
    </div>
  );
}


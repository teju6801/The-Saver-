"use client";

import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  excerpt: string;
  author: string;
  published: boolean;
  createdAt: any;
  updatedAt: any;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const q = query(collection(db, 'blog-posts'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        notFound();
        return;
      }
      const data = snapshot.docs[0].data();
      setPost({ id: snapshot.docs[0].id, ...data } as BlogPost);
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className='min-h-screen py-20 flex justify-center items-center'>
        <div className='text-lg text-gray-500'>Loading post...</div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <article className='max-w-4xl mx-auto py-16 px-4'>
      <Link 
        href='/blog' 
        className='inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 text-sm font-medium'
      >
        ← Back to Blog
      </Link>

      <div className='text-center mb-16'>
        <span className='inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6'>
          {post.category}
        </span>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight'>
          {post.title}
        </h1>
        <div className='text-sm text-gray-500'>
          By {post.author} • {post.createdAt?.toDate().toLocaleDateString()}
        </div>
      </div>

      <div 
        className='prose prose-lg max-w-none'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className='mt-20 pt-12 border-t border-gray-200'>
        <Link 
          href='/blog' 
          className='inline-flex items-center text-orange-600 hover:text-orange-700 font-medium'
        >
          ← View all posts
        </Link>
      </div>
    </article>
  );
}



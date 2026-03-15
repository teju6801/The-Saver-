"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100'
      >
        <h1 className='text-3xl font-bold mb-8 text-center text-gray-900'>
          Admin Login
        </h1>

        {error && (
          <div className='mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 text-center font-medium'>
            {error}
          </div>
        )}

        <div className='space-y-4'>
          <input
            type='email'
            placeholder='Admin email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            required
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
            required
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

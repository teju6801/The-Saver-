"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { approveRequest, rejectRequest } from '@/lib/adoptions';

export default function AdoptionRequests() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'adoptionRequests'), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(list);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <div className='flex justify-between items-center mb-12 lg:mb-16'>
        <h2 className='text-3xl lg:text-4xl font-semibold text-gray-900'>
          Adoption Requests
        </h2>
        <div className='flex items-center gap-4'>
          <div className='text-2xl text-gray-500'>
            {requests.length} total
          </div>
          <Link href='/admin/dogs'>
            <button
              className='bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 font-medium transition-colors whitespace-nowrap'
            >
              + Post New Dog
            </button>
          </Link>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className='card text-center py-32 rounded-3xl'>
          <p className='text-3xl text-gray-500'>No adoption requests yet</p>
        </div>
      ) : (
        <div className='card rounded-3xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-50/50'>
                  <th className='px-8 py-8 text-left text-xl font-semibold text-gray-700 border-b border-gray-200'>Dog</th>
                  <th className='px-8 py-8 text-left text-xl font-semibold text-gray-700 border-b border-gray-200'>Applicant</th>
                  <th className='px-8 py-8 text-left text-xl font-semibold text-gray-700 border-b border-gray-200'>Contact</th>
                  <th className='px-8 py-8 text-left text-xl font-semibold text-gray-700 border-b border-gray-200'>Status</th>
                  <th className='px-8 py-8 text-left text-xl font-semibold text-gray-700 border-b border-gray-200'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {requests.map((r) => (
                  <tr key={r.id} className='hover:bg-gray-50/50'>
                    <td className='px-8 py-8 font-semibold text-lg'>{r.dogName}</td>
                    <td className='px-8 py-8 font-medium'>{r.name}</td>
                    <td className='px-8 py-8'>
                      <div>{r.email}</div>
                      <div className='text-gray-600'>{r.phone}</div>
                    </td>
                    <td>
                      {r.status === 'pending' && (
                        <span className='inline-flex px-6 py-3 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200'>
                          Pending
                        </span>
                      )}
                      {r.status === 'approved' && (
                        <span className='inline-flex px-6 py-3 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200'>
                          Approved
                        </span>
                      )}
                      {r.status === 'rejected' && (
                        <span className='inline-flex px-6 py-3 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-200'>
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className='px-8 py-8'>
                      {r.status === 'pending' && (
                        <div className='flex gap-3'>
                          <button
                            onClick={async () => {
                              await approveRequest(r.id);
                            }}
                            className='btn-primary text-lg px-8 py-4 whitespace-nowrap'
                          >
                            Approve
                          </button>
                          <button
                            onClick={async () => {
                              await rejectRequest(r.id);
                            }}
                            className='bg-gray-900 hover:bg-gray-800 text-white text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap'
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {r.status !== 'pending' && (
                        <span className='text-gray-500 text-sm font-medium'>Complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import useLostFoundDogs from '@/hooks/useLostFoundDogs';
import LostFoundRow from './LostFoundRow';

export default function AdminLostFound() {
  const [reports, setReports] = useState<any[]>([]);
  const allReports = useLostFoundDogs();

  useEffect(() => {
    if (!allReports) return;

    const activeReports = allReports.filter(
      (report) => report.status !== 'resolved'
    );

    setReports(activeReports);
  }, [allReports]);

  if (!allReports) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-lg text-gray-500'>Loading reports...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center mb-10'>
        <h2 className='text-2xl md:text-3xl font-semibold text-gray-900'>
          Lost & Found Reports ({reports.length})
        </h2>
      </div>

      {/* Empty State */}
      {reports.length === 0 ? (
        <div className='text-center py-20 text-gray-500'>
          No active reports.
        </div>
      ) : (
        <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-4 text-left text-base font-medium text-gray-600'>Dog Name</th>
                <th className='px-6 py-4 text-left text-base font-medium text-gray-600'>Type</th>
                <th className='px-6 py-4 text-left text-base font-medium text-gray-600'>Location</th>
                <th className='px-6 py-4 text-left text-base font-medium text-gray-600'>Contact</th>
                <th className='px-6 py-4 text-left text-base font-medium text-gray-600'>Status</th>
                <th className='px-6 py-4 text-left text-base font-medium text-gray-600'>Coords</th>
                <th className='px-6 py-4 text-left text-base font-medium text-gray-600'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {reports.map((report) => (
                <LostFoundRow key={report.id} report={report} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

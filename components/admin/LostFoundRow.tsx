"use client";

import { deleteLostFoundReport, markResolved } from '@/lib/lost-found';
import Link from 'next/link';

export default function LostFoundRow({ report }: { report: any }) {

  const handleDelete = async () => {
    if (confirm('Delete this report?')) {
      await deleteLostFoundReport(report.id);
    }
  };

  const handleResolved = async () => {
    await markResolved(report.id);
  };

  const coordsLink = report.lat && report.lng 
    ? `https://maps.google.com/?q=${report.lat},${report.lng}`
    : '#';

  return (
    <tr className='hover:bg-gray-50/50 h-20'>
      <td className='px-6 py-4 font-semibold'>{report.dogName}</td>
      <td className='px-6 py-4'>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          report.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {report.type.toUpperCase()}
        </span>
      </td>
      <td className='px-6 py-4'>{report.location}</td>
      <td className='px-6 py-4 font-medium'>{report.contact}</td>
      <td className='px-6 py-4'>
        {report.status === 'resolved' ? (
          <span className='inline-flex px-6 py-3 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200'>
            Resolved
          </span>
        ) : (
          <span className='inline-flex px-6 py-3 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200'>
            Active
          </span>
        )}
      </td>
      <td className='px-6 py-4'>
        {report.lat && report.lng ? (
          <Link
            href={coordsLink}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:text-blue-800 font-medium text-sm underline'
          >
            View Location →
          </Link>
        ) : (
          <span className='text-gray-500 text-sm'>No coordinates</span>
        )}
      </td>
      <td className='px-6 py-4'>
        <div className='flex gap-2'>
          <button
            onClick={handleResolved}
            className='bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg font-medium'
            disabled={report.status === 'resolved'}
          >
            {report.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
          </button>
          <button
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium'
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

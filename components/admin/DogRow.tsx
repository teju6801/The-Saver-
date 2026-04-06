"use client";

import { deleteDog, markAdopted } from '@/lib/dogs';

export default function DogRow({ dog }: any) {
  const handleDelete = async () => {
    if (confirm('Delete this dog?')) {
      try {
        await deleteDog(dog.id);
        alert('Dog deleted successfully!');
      } catch (error: any) {
        console.error('Delete error:', error);
        alert('Failed to delete dog: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleAdopted = async () => {
    try {
      await markAdopted(dog.id);
      alert('Dog marked as adopted successfully!');
    } catch (error: any) {
      console.error('Mark adopted error:', error);
      alert('Failed to mark dog as adopted: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <tr className="hover:bg-gray-50/50 h-20">
      <td className="px-8 py-8 font-semibold text-lg">{dog.name}</td>
      <td className="px-8 py-8 text-lg font-medium">{dog.breed}</td>
      <td className="px-8 py-8 text-lg">{dog.age}</td>
      <td>
        {dog.status === "adopted" ? (
          <span className="inline-flex px-6 py-3 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Adopted
          </span>
        ) : (
          <span className="inline-flex px-6 py-3 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-200">
            Available
          </span>
        )}
      </td>
      <td className="px-8 py-8">
        <div className="flex gap-3">
          <button
            onClick={handleAdopted}
            className="btn-primary text-sm px-6 py-3 whitespace-nowrap"
            disabled={dog.status === "adopted"}
          >
            {dog.status === "adopted" ? "Adopted" : "Mark Adopted"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

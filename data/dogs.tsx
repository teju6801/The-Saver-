"use client";

import { useState } from "react";
import { useDogs } from "@/hooks/useDogs";

export default function AdminDogs() {

  const [showModal, setShowModal] = useState(false);
  const { dogs: allDogsData, loading } = useDogs();
  const allDogs = allDogsData || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading dogs...</p>
      </div>
    );
  }

  // Filter dogs safely
  const dogs = allDogs.filter((dog) => !dog.adopted);

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Manage Dogs ({dogs.length})
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Dog
        </button>
      </div>

      {/* Empty State */}
      {dogs.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No available dogs. Add one using the button above.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Breed</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Age</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {dogs.map((dog) => (
                <tr key={dog.id}>
                  <td className="px-6 py-4">{dog.name}</td>
                  <td className="px-6 py-4">{dog.breed}</td>
                  <td className="px-6 py-4">{dog.age}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${dog.adopted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {dog.adopted ? 'Adopted' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-orange-600 hover:text-orange-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

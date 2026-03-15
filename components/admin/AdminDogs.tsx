"use client";

import { useState, useEffect } from "react";
import { useDogs } from "@/hooks/useDogs";
import DogRow from "./DogRow";
import AddDogModal from "./AddDogModal";

export default function AdminDogs() {

  const [showModal, setShowModal] = useState(false);
  const [dogs, setDogs] = useState<any[]>([]);
  const { dogs: allDogs } = useDogs();

  useEffect(() => {

    if (!allDogs) return;

    const availableDogs = allDogs.filter(
      (dog: any) => dog.status !== "adopted"
    );

    setDogs(availableDogs);

  }, [allDogs]);

  if (!allDogs) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-500">Loading dogs...</div>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Manage Dogs ({dogs.length})
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
        >
          + Add Dog
        </button>
      </div>

      {/* Empty State */}
      {dogs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No available dogs. Add some using the button above.
        </div>
      ) : (

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Breed</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Age</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {dogs.map((dog: any) => (
                <DogRow key={dog.id} dog={dog} />
              ))}
            </tbody>

          </table>

        </div>
      )}

      {/* Modal */}
      {showModal && (
        <AddDogModal onClose={() => setShowModal(false)} />
      )}

    </div>
  );
}
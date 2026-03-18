"use client";

import { useState } from "react";
import { addDog } from "@/lib/dogs";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



export default function AddDogModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [story, setStory] = useState("");
const [file, setFile] = useState<File | null>(null);
const [uploading, setUploading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setUploading(true);

  try {
    let imageUrl = '';
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');
      imageUrl = uploadData.url;
    }

    const dogData = {
      name,
      breed,
      age,
      story,
      imageUrl,
      createdAt: Date.now()
    };

    await addDog(dogData);
    alert("Dog posted successfully for adoption!");
    onClose();
  } catch (error) {
    alert(`Error: ${(error as Error).message}`);
  } finally {
    setUploading(false);
  }
};
  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-10 lg:p-12">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900">
              Post New Dog for Adoption
            </h2>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 text-2xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="space-y-6">
              <input
                type="text"
                placeholder="Dog Name *"
                className="input-field text-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Breed *"
                className="input-field text-xl"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Age (e.g. 2 years) *"
                className="input-field text-xl"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="space-y-6 lg:pt-2">
              <textarea
                placeholder="Dog Story"
                className="input-field resize-vertical min-h-[200px] text-xl"
                value={story}
                onChange={(e) => setStory(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="input-field text-xl"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-xl py-8 w-full sm:w-auto flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary text-xl py-8 w-full sm:w-auto flex-1 font-semibold"
              >
                {uploading ? 'Posting...' : 'Post Dog for Adoption'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";

export default function DogImageGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Main Image */}
      <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={selected}
          alt="Dog"
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 lg:gap-6 snap-x overflow-x-auto pb-4 -m-2 lg:-m-3 scrollbar-hide">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-28 h-28 lg:w-32 lg:h-32 flex-shrink-0 cursor-pointer border-4 border-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 ring-2 ring-transparent hover:ring-orange-500/50"
            onClick={() => setSelected(img)}
          >
            <Image
              src={img}
              alt={`Dog thumbnail ${index + 1}`}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
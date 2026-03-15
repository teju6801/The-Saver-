import Image from "next/image";

export default function LostDogCard({ dog }: { dog: any }) {

  return (
    <div className="card group/card h-full">
      <div className="relative h-64 lg:h-72 overflow-hidden rounded-t-3xl">
        <Image
          src={dog.image || "/dogs/dog1.jpg"}
          alt={dog.dogName}
          fill
          className="object-cover group-hover/card:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 via-transparent" />
      </div>

      <div className="p-8 space-y-4">

        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover/card:text-primary-600 transition-colors duration-400">
          {dog.dogName}
        </h3>

        <p className="text-lg text-gray-700 font-medium flex items-center gap-2">
          📍 {dog.location}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {dog.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p title={dog.contact} className="text-sm font-semibold text-primary-600 truncate max-w-[70%]">
            📞 {dog.contact}
          </p>
          <span className={`px-4 py-2 rounded-full text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 ${
            dog.type === 'lost' 
              ? 'bg-gradient-to-r from-red-400 to-red-500 hover:shadow-red-300/50' 
              : 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-emerald-300/50'
          }`}>
            {dog.type === "lost" ? "Lost" : "Found"}
          </span>
        </div>

      </div>

    </div>
  );
}


import Image from "next/image";

export default function LostDogCard({ dog }: { dog: any }) {

  return (
    <div className="card group/card h-full">
      <div className="relative h-48 lg:h-56 overflow-hidden rounded-t-3xl">
        <Image
          src={dog.image || "/dogs/dog1.jpg"}
          alt={dog.dogName}
          fill
          className="object-cover group-hover/card:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 via-transparent" />
      </div>

      <div className="p-4 lg:p-6 space-y-3">

        <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover/card:text-primary-600 transition-colors">
          {dog.dogName}
        </h3>

        <p className="text-sm font-medium flex items-center gap-2 text-gray-600">
          📍 {dog.location}
        </p>

        <p className="text-sm line-clamp-2 text-gray-600">
          {dog.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <p title={dog.contact} className="text-xs font-semibold text-primary-600 truncate">
            📞 {dog.contact}
          </p>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 ${
            dog.type === 'lost' 
              ? 'bg-gradient-to-r from-red-400 to-red-500 hover:shadow-red-200/50' 
              : 'bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-emerald-200/50'
          }`}>
            {dog.type === "lost" ? "Lost" : "Found"}
          </span>
        </div>

      </div>


    </div>
  );
}


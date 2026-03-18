import Image from "next/image";
import Link from "next/link";

type DogCardProps = {
  id: number;
  name: string;
  age: string;
  breed: string;
  image: string;
};

export default function DogCard({ id, name, age, breed, image }: DogCardProps) {
  return (
    <div className="card group/card">
      <div className="relative w-full h-64 lg:h-80 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 via-transparent to-transparent" />
      </div>

      <div className="p-8 lg:p-10">

        <h3 className="heading-3 text-gray-900 group-hover/card:text-primary-600 transition-colors duration-400">
          {name}
        </h3>

        <p className="body-secondary mb-8 font-medium flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-pulse-slow" />
          {age} • {breed}
        </p>

        <Link
          href={`/adopt/${id}`}
          className="btn-primary w-full"
        >
          View Profile →
        </Link>

      </div>
    </div>
  );
}


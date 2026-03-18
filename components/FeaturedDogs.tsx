import DogCard from "./dogs/DogCard";

export default function FeaturedDogs() {
  return (
    <section className="section bg-gradient-to-br from-primary-50 via-white to-gray-50/50">
      <div className="page-container">
        <div className="text-center mb-20 lg:mb-28">
          <h2 className="heading-2 bg-gradient-to-r from-gray-900 to-primary-500 bg-clip-text text-transparent">
            Dogs Ready
            <br className="hidden md:inline" />
            <span className="text-transparent bg-gradient-to-r from-primary-500 to-orange-500 bg-clip-text">for Adoption</span>
          </h2>
          <p className="body-primary text-gray-600 max-w-3xl mx-auto">
            Meet our rescue stars looking for their forever homes
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          <DogCard id={1} name="Buddy" age="2 years" breed="Labrador" image="/dogs/dog1.jpg" />
          <DogCard id={2} name="Lucy" age="1 year" breed="Indie Mix" image="/dogs/dog2.jpg" />
          <DogCard id={3} name="Max" age="3 years" breed="Beagle" image="/dogs/dog3.jpg" />
        </div>
      </div>
    </section>
  );
}

import AboutPage from "@/components/AboutPage";
import Hero from "@/components/HeroSection";
import HospitalImageGallery from "@/components/HospitalGallery";
import { NavigationBar } from "@/components/NavBar";
import ServiceCard from "@/components/ServiceCard";
import initializeDb from "@/lib/db";
import services from "@/SampleData/ServicesData";

export default function Home() {
  // initializeDb();
  return (
    <>
      <NavigationBar />
      <Hero />
      <HospitalImageGallery />
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 font-serif">
          Our Services
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-6">
        {services.map((service) => (
          <ServiceCard key={service.id} serviceData={service} />
        ))}
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 font-serif">
          About Us
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <AboutPage />
    </>
  );
}

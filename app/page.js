import AboutPage from "@/components/AboutPage";
import ContactUsForm from "@/components/ContactUsForm";
import Hero from "@/components/HeroSection";
import HospitalImageGallery from "@/components/HospitalGallery";
import { NavigationBar } from "@/components/NavBar";
import ServiceCard from "@/components/ServiceCard";
import initializeDb from "@/lib/db";
import services from "@/SampleData/ServicesData";
import { data } from "@/SampleData/Faq";
import FAQComponent from "@/components/FaqS";
import ReviewsComponent from "@/components/Reviews";
import Footer from "@/components/Footer";
export default function Home() {
  // initializeDb();
  return (
    <>
      <Hero />
      <HospitalImageGallery />
      <div id="servicesSection" className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 font-serif">
          Our Services
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-6">
        {services.map((service) => (
          <ServiceCard key={service.id} serviceData={service} />
        ))}
      </div>

      <div id="ReviewsSection" className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 font-serif">Reviews</h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <ReviewsComponent />

      <div id="aboutSection" className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 font-serif">
          About Us
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <AboutPage />

      <div id="FaqSection" className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 font-serif">FAQ</h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <FAQComponent />

      <div id="contactSection" className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 font-serif">
          Contact Us
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      <ContactUsForm />
      <Footer />
    </>
  );
}

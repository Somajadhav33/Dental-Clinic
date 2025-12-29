import Hero from "@/components/HeroSection";
import HospitalImageGallery from "@/components/HospitalGallery";
import { NavigationBar } from "@/components/NavBar";
import ServiceCard from "@/components/ServiceCard";
import initializeDb from "@/lib/db";

export default function Home() {
  initializeDb();
  return (
    <>
      <NavigationBar />
      <Hero />
      <HospitalImageGallery />
      <ServiceCard />
    </>
  );
}

import Hero from "@/components/HeroSection";
import HospitalImageGallery from "@/components/HospitalGallery";
import { NavigationBar } from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <HospitalImageGallery/>
    </>
  );
}

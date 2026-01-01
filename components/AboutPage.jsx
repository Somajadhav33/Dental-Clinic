import Image from "next/image";
import { MapPin, Clock, User, Phone, ExternalLink } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-24">
      {/* Clinic Info Section */}
      <section className="relative overflow-hidden">
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase">
              Healing with care
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 font-serif leading-tight">
              Modern Dentistry <br />
              <span className="text-gray-500">With a Human Touch</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Aabha Dental Clinic & Smile Centre provides comprehensive dental
                care ranging from regular check-ups to advanced restorative
                treatments. Our focus is on delivering a natural look using
                state-of-the-art tooth-colored ceramic materials.
              </p>
              <p>
                We pride ourselves on maintaining the highest standards of
                hygiene and investing in modern dental technology. Patient
                comfort is our top priority, ensuring every visit is stress-free
                and rewarding.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <p className="text-sm font-medium text-gray-500">
                Trusted by{" "}
                <span className="text-blue-600 font-bold">1000+</span> satisfied
                patients
              </p>
            </div>
          </div>

          <div className="flex-1 mt-12 lg:mt-0 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500">
                  <Image
                    src="/g1.jpg"
                    alt="Clinic Interior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-500">
                  <Image
                    src="/g5.jpg"
                    alt="Dental Equipment"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-500">
                  <Image
                    src="/g1.jpg"
                    alt="Consultation Area"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500">
                  <Image
                    src="/g5.jpg"
                    alt="Smiles Gallery"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Clinics Locations */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 font-serif">
            Our Clinics
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Clinic 1 - Miraj */}
          <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8">
              <Image
                src="/g5.jpg"
                alt="Miraj Clinic"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-blue-900 shadow-sm">
                Miraj Branch
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-900">
                AABHA DENTAL CLINIC <br /> & SMILE CENTRE
              </h3>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-cyan-600 mt-1 shrink-0" />
                  <p>
                    <span className="font-semibold text-gray-900">
                      Dentist:
                    </span>{" "}
                    Dr. Bhushan Dadaso Tale
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-600 mt-1 shrink-0" />
                  <p>
                    <span className="font-semibold text-gray-900">Timing:</span>{" "}
                    Mon - Sat, 9:00 AM – 2:00 PM
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-600 mt-1 shrink-0" />
                  <p className="text-sm">
                    Deval Dairy - Kajah Beedi, Vijay Colony, Shivaji Nagar,
                    Miraj, Maharashtra 416410
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/QK9ShNw97yG94hti9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-700 transition-colors group/link"
              >
                View on Google Maps
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Clinic 2 - Bedag */}
          <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8">
              <Image
                src="/g1.jpg"
                alt="Bedag Clinic"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-blue-900 shadow-sm">
                Bedag Branch
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-900">
                AABHA DENTAL CLINIC <br /> & SMILE CENTRE
              </h3>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-cyan-600 mt-1 shrink-0" />
                  <p>
                    <span className="font-semibold text-gray-900">
                      Dentist:
                    </span>{" "}
                    Dr. Bhushan Dadaso Tale
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-600 mt-1 shrink-0" />
                  <p>
                    <span className="font-semibold text-gray-900">Timing:</span>{" "}
                    Mon - Sat, 4:00 PM – 9:00 PM
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-600 mt-1 shrink-0" />
                  <p className="text-sm text-center">
                    BUS STAND, Miraj - Bedag Rd, Maharashtra 416401
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/5NkoQR4FpzjbnR3FA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-700 transition-colors group/link"
              >
                View on Google Maps
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dentist Profiles */}
      <section className="space-y-16 pb-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 font-serif">
            Meet Our Specialist
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          {/* Profile card */}
          <div className="w-full max-w-sm group shadow p-4 border rounded-sm hover:shadow-2xl transition-all duration-300">
            <div className="relative mb-6">
              {/* Profile Image with decorative background */}
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/g5.jpg"
                  alt="Dr. Bhushan Dadaso Tale"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-blue-900">
                Dr. Bhushan Dadaso Tale
              </h3>
              <p className="text-cyan-600 font-semibold">BDS, Dental Surgeon</p>
              <div className="pt-2 text-gray-600 text-sm italic">
                Bharati Vidyapeeth Dental College and Hospital
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <div className="w-px h-8 bg-gray-200 self-center"></div>
                <button className="px-6 py-2 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors shadow-md">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm group shadow p-4 border rounded-sm hover:shadow-2xl transition-all duration-300">
            <div className="relative mb-6">
              {/* Profile Image with decorative background */}
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/g5.jpg"
                  alt="Dr. Bhushan Dadaso Tale"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-blue-900">
                Dr. Bhushan Dadaso Tale
              </h3>
              <p className="text-cyan-600 font-semibold">BDS, Dental Surgeon</p>
              <div className="pt-2 text-gray-600 text-sm italic">
                Bharati Vidyapeeth Dental College and Hospital
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <div className="w-px h-8 bg-gray-200 self-center"></div>
                <button className="px-6 py-2 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors shadow-md">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

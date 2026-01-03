import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white text-slate-900 overflow-hidden">
      {" "}
      <div className="absolute inset-0">
        <Image
          src="/hero-2.jpeg"
          alt="Modern hospital building"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-white/20" />
      </div>
      <div className="absolute top-8 right-8 bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl font-semibold text-lg z-10 animate-bounce">
        Emergency? Call: XXX XXXX XXXXX
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-serif text-slate-900">
              Smile Brighter,
              <br />
              <span className="text-indigo-500"> Live Healthier </span>
            </h1>

            <p className="text-xl md:text-2xl oklch(37.3% 0.034 259.733) max-w-2xl leading-relaxed">
              Comprehensive dental care at Aabha Dental Clinic, combining
              advanced treatments, gentle hands, and a commitment to lifelong
              oral health.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <a
                href="#appointments"
                className="inline-block bg-primary-500 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Book an Appointment
              </a>
              <a
                href="#emergency"
                className="inline-block bg-white border-2 border-slate-200 text-slate-700 font-semibold text-lg px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-center"
              >
                Check Appointment Status
              </a>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <div className="relative h-80 md:h-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/hero-3.jpeg"
                  alt="Doctors and nurses caring for a patient"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/hero-1.jpeg"
                alt="Advanced hybrid operating room"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/hero-4.jpg"
                alt="Modern MRI scanner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

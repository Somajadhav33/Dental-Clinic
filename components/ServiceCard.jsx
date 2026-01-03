import Image from "next/image";

export default function ServiceCard({ serviceData }) {
  const { name, description, image_url, is_active } = serviceData;
  return (
    <div className="flex flex-col md:flex-row bg-[#fdf7f3] rounded-2xl border border-orange-200 overflow-hidden w-full min-h-250px hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="w-full md:w-56 lg:w-64 h-56 md:h-auto bg-[#e6dcd2] shrink-0 border-b md:border-b-0 md:border-r border-orange-100">
        <Image
          src={image_url}
          alt={name}
          width={300}
          height={200}
          className="w-full h-full object-contain p-4"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="p-5 md:p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          <p
            className={
              is_active
                ? "text-green-600 text-sm font-semibold uppercase tracking-wider"
                : "text-red-500 text-sm font-semibold uppercase tracking-wider"
            }
          >
            {is_active ? "Available" : "Not available"}
          </p>
          <div>
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
              {name}
            </h2>
            <p className="text-gray-600 mt-1 text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-end items-center gap-3 mt-2">
          <button className="rounded-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 h-auto text-xs font-bold uppercase shadow-sm">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

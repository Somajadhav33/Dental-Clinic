import Image from "next/image";
import Link from "next/link";
import db from "@/lib/db";

async function getServices() {
  try {
    const result = await db.query(
      "SELECT * FROM services ORDER BY display_order ASC",
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServiceCard() {
  const services = await getServices();

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-6">
      {services.map(({ id, name, description, image_url, is_active }) => (
        <div
          key={id}
          className="flex flex-col md:flex-row bg-[#fdf7f3] rounded-2xl border border-orange-200 overflow-hidden w-full hover:shadow-md transition-shadow"
        >
          <div className="w-full mt-1.5 md:w-56 lg:w-55 rounded-2xl h-48 bg-[#e6dcd2] shrink-0 border-b md:border-b-0 md:border-r border-orange-100 flex items-center justify-center">
            <Image
              src={image_url || "/placeholder-service.png"}
              alt={name}
              width={300}
              height={300}
              className="object-contain w-full h-full p-4 rounded-xl"
              priority
            />
          </div>

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

              <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                {name}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex justify-end">
              <Link href={`/book-appointment?service=${name}`}>
                <button className="rounded-sm text-white bg-orange-500 cursor-pointer hover:bg-orange-600 px-4 py-1.5 text-xs font-bold uppercase shadow-sm">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

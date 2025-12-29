import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ServiceCard() {
  return (
    <div className="flex flex-col md:flex-row bg-[#fdf7f3] rounded-2xl border border-orange-200 overflow-hidden max-w-5xl">
      
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-[#e6dcd2]">
        <Image
          src="/root-canal.jpeg"   // place image in /public
          alt="Root Canal Treatment"
          fill
          className="object-contain p-6"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Root Canal Treatment
            </h2>
            <p className="text-gray-600 mt-1">
              Ideal for infected or damaged tooth
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Types of RCT
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Root Canal Treatment</li>
              <li>Split RCT</li>
              <li>Split RCT with rubber dam</li>
              <li>Split RCT with laser</li>
            </ul>
          </div>

          <div>
            <p className="text-orange-500 font-medium">
              Starting Price
            </p>
            <p className="text-2xl font-bold text-gray-900">
              ₹ 19,999
            </p>
          </div>
        </div>

        <Button className="mt-6 w-fit rounded-full bg-orange-500 hover:bg-orange-600 px-6">
          Get Free Consultation
        </Button>
      </div>
    </div>
  )
}

// components/LakeCard.tsx
'use client';

import { FiDroplet, FiMapPin, FiTrendingDown, FiLayers } from 'react-icons/fi';
import { FaRulerHorizontal } from 'react-icons/fa';
import ProgressLink from './progresslink';
import { HiArrowNarrowRight } from "react-icons/hi";

interface Lake {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt?: { rendered: string };
  content?: { rendered: string };
  acf?: any;
  _embedded?: any;
}

export default function LakeCard2({ lake }: { lake: Lake }) {
  const image = lake._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';
  const description = lake.excerpt?.rendered || lake.content?.rendered || '';
  const acf = lake.acf || {};
  const barangay = acf.barangay?.value;
  const distance = acf.distance_from_city_proper?.value;
  const depth = acf.maximum_depth?.value;
  const area = acf.surface_area?.value;

  return (
    <div className="group bg-white border cursor-pointer border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-md transition duration-300 flex flex-col">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={lake.title.rendered}
          className="w-full h-48 object-cover group-hover:scale-[1.03] transition duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <FiDroplet className="text-[#0F766E] dark:text-white text-lg dark:group-hover:text-[#3ef7e8]" />
          <h2 className="font-semibold text-lg text-[#0F766E] dark:text-white group-hover:text-[#2fbaae] dark:group-hover:text-[#3ef7e8]  transition">
            {lake.title.rendered}
          </h2>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-white/65 space-y-2">
          {barangay && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <FiMapPin />
                <span className="font-medium">Barangay:</span>
              </div>
              <div className="flex-1 border-b border-dotted border-gray-300 mx-2" />
              <span className="whitespace-nowrap">{barangay}</span>
            </div>
          )}
          {distance && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <FaRulerHorizontal />
                <span className="font-medium">Distance:</span>
              </div>
              <div className="flex-1 border-b border-dotted border-gray-300 mx-2" />
              <span className="whitespace-nowrap">{distance}</span>
            </div>
          )}
          {depth && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <FiTrendingDown />
                <span className="font-medium">Max Depth:</span>
              </div>
              <div className="flex-1 border-b border-dotted border-gray-300 mx-2" />
              <span className="whitespace-nowrap">{depth}</span>
            </div>
          )}
          {area && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <FiLayers />
                <span className="font-medium">Surface Area:</span>
              </div>
              <div className="flex-1 border-b border-dotted border-gray-300 mx-2" />
              <span className="whitespace-nowrap">{area}</span>
            </div>
          )}
        </div>

        <div
          className="text-xs text-gray-500 mt-4 text-justify line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="mt-4">
          <ProgressLink href={`/lakes/${lake.slug}`}>
            <button className="flex items-center cursor-pointer gap-1 px-3 py-2 text-xs font-medium bg-[#09637e] hover:bg-[#0f766e] text-white rounded-md transition">
              View Full Details
              <HiArrowNarrowRight />
            </button>
          </ProgressLink>
        </div>
      </div>
    </div>
  );
}
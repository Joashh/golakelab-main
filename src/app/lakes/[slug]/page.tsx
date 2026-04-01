
import { Tabs } from "@/app/component/tab"
import ProgressLink from "@/app/component/progresslink";
import { ChevronRight } from "lucide-react";
import { FaRulerHorizontal } from "react-icons/fa";
import { FiMapPin, FiTrendingDown, FiLayers } from "react-icons/fi";
import { IoFishOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FiFileText, FiUnlock, FiShare2 } from 'react-icons/fi';
import SmileySurvey from "@/app/component/smileysurvey";
import RightModal from "@/app/component/rightmodal";
import LakeActions from "@/app/component/lakeActions";

type Params = {
  params: {
    slug: string;
  };
};

async function getSectionTypes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/section_type`,
    { cache: "no-store" }
  );

  return res.json();
}

async function getLakesByCategoryId(categoryId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake?lake-category=${categoryId}&_embed&acf_format=standard`,
    { cache: "no-store" }
  );

  return res.json();
}

async function getLakeBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data[0];
}

async function getLakeSections(lakeId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake-section?_embed&order=asc&orderby=date`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return data.filter((section: any) => {
    return section?.acf?.parent_lake?.value == lakeId;
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;



  const lake = await getLakeBySlug(slug);

  const sectionTypes = await getSectionTypes();

  const termMap: Record<number, string> = {};

  sectionTypes.forEach((term: any) => {
    termMap[term.id] = term.name;
  });

  if (!lake) {
    return <div>Lake not found</div>;
  }

  const lakeSections = await getLakeSections(lake.id);

  console.log(JSON.stringify(lakeSections, null, 2));

  // Group by taxonomy (tab name)
  const grouped: Record<string, any[]> = {};

  lakeSections.forEach((section: any) => {
    const termIds = section.section_type || [];

    // If no taxonomy assigned, fallback to "Other"
    if (termIds.length === 0) {
      if (!grouped["Other"]) {
        grouped["Other"] = [];
      }
      grouped["Other"].push(section);
      return;
    }

    termIds.forEach((termId: number) => {
      const tabName = termMap[termId] || "Other";

      if (!grouped[tabName]) {
        grouped[tabName] = [];
      }

      grouped[tabName].push(section);
    });
  });

  const tabs = Object.keys(grouped);

  const barangay = lake.acf?.barangay?.value;
  const distance = lake.acf?.distance_from_city_proper?.value;
  const depth = lake.acf?.maximum_depth?.value;
  const area = lake.acf?.surface_area?.value;
  const fish = lake.acf?.type_of_fish_present?.value;

  const categories = lake._embedded?.["wp:term"]?.flat() || [];
  const category = categories.find((term: any) => term.taxonomy === "lake-category");

  const image =
    lake._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/placeholder.jpg";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">


      {/* HERO */}
      <div className="relative h-72 md:h-80">

        {/* Background Image */}
        <img src={image} className="w-full h-full object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">

          <div className="max-w-7xl mx-auto px-6 w-full text-white">



            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              {lake.title.rendered}
            </h1>

            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center text-sm text-white/70 gap-y-1 mb-3">

              <ProgressLink href="/" className="hover:text-white transition">
                Home
              </ProgressLink>

              <ChevronRight className="w-4 h-4 mx-2 text-white/50" />

              <ProgressLink href="/lake-categories" className="hover:text-white transition">
                Lake Categories
              </ProgressLink>

              <ChevronRight className="w-4 h-4 mx-2 text-white/50" />

              <ProgressLink
                href={`/lake-categories/${category?.slug}`}
                className="hover:text-white transition"
              >
                {category?.name}
              </ProgressLink>

              <ChevronRight className="w-4 h-4 mx-2 text-white/50" />

              <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
                {lake.title.rendered}
              </span>

            </div>


          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-10 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-100 dark:border-gray-700">

        {distance && (
          <div className="flex flex-col items-center justify-center gap-2 md:border-r md:border-gray-200 dark:md:border-gray-600 md:pr-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#d0e8e8] dark:bg-[#065666]">
              <FiMapPin className="text-[#09637e] dark:text-teal-300" />
            </div>
            <div className="text-center leading-tight">
              <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
              <p className="font-semibold text-[#0F766E] dark:text-teal-200">{distance}</p>
            </div>
          </div>
        )}

        {depth && (
          <div className="flex flex-col items-center justify-center gap-2 md:border-r md:border-gray-200 dark:md:border-gray-600 md:pr-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#d0e8e8] dark:bg-[#065666]">
              <FiTrendingDown className="text-[#09637e] dark:text-teal-300" />
            </div>
            <div className="text-center leading-tight">
              <p className="text-xs text-gray-500 dark:text-gray-400">Max Depth</p>
              <p className="font-semibold text-[#0F766E] dark:text-teal-200">{depth}</p>
            </div>
          </div>
        )}

        {area && (
          <div className="flex flex-col items-center justify-center gap-2 md:border-r md:border-gray-200 dark:md:border-gray-600 md:pr-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#d0e8e8] dark:bg-[#065666]">
              <FiLayers className="text-[#09637e] dark:text-teal-300" />
            </div>
            <div className="text-center leading-tight">
              <p className="text-xs text-gray-500 dark:text-gray-400">Surface Area</p>
              <p className="font-semibold text-[#0F766E] dark:text-teal-200">{area}</p>
            </div>
          </div>
        )}

        {fish && (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#d0e8e8] dark:bg-[#065666]">
              <IoFishOutline className="text-[#09637e] dark:text-teal-300" />
            </div>
            <div className="text-center leading-tight">
              <p className="text-xs text-gray-500 dark:text-gray-400">Fish Type</p>
              <p className="font-semibold text-[#0F766E] dark:text-teal-200">{fish}</p>
            </div>
          </div>
        )}

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto  py-10 flex flex-col gap-8">


        <div className="space-y-8">

          {/* DESCRIPTION */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">

            <div className="flex flex-col md:flex-row gap-6">

              {/* LEFT: IMAGE */}
              <div className="shrink-0">
                <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={lake.title.rendered}
                  />
                </div>
              </div>

              {/* RIGHT: INFO */}
              <div className="flex-1 space-y-4">

                {/* NAME + BUTTONS + LOCATION */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                  {/* NAME */}
                  <h3 className="text-2xl font-semibold text-[#0F766E] dark:text-teal-200">
                    {lake.title.rendered}
                  </h3>

                  {/* BUTTONS */}
                  <LakeActions/>
                </div>

                {/* LOCATION */}
                {barangay && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <span><FaLocationDot className="dark:text-teal-300" /></span>
                    <span>{barangay}</span>
                  </p>
                )}

                {/* DIVIDER */}
                <div className="border-t border-gray-100 dark:border-gray-600" />

                {/* BIO / DESCRIPTION */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    About This Lake
                  </h4>

                  <div
                    className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: lake.content.rendered }}
                  />
                </div>

              </div>

            </div>

          </div>

          {/* TABS */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            {tabs.length > 0 && <Tabs grouped={grouped} tabs={tabs} />}
          </div>

        </div>

      </div>

      <SmileySurvey />

    </div>
  );
}
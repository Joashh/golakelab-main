import ProgressLink from "@/app/component/progresslink";
import Link from "next/link";
import { FiMapPin, FiSun, FiUsers, FiCloud, FiFeather, FiClock, FiTrendingDown, FiLayers, FiDroplet } from "react-icons/fi";
import { RiLeafFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { FaRulerHorizontal } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

type Params = {
    params: Promise<{
        slug: string;
    }>;
};



async function getCategoryBySlug(slug: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake-category?slug=${slug}`,
        { cache: "no-store" }
    );

    const data = await res.json();
    return data[0];
}

async function getLakesByCategoryId(categoryId: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake?lake-category=${categoryId}&_embed`,
        { cache: "no-store" }
    );
    return res.json();
}

export default async function Page({ params }: Params) {
    const { slug } = await params;

    const category = await getCategoryBySlug(slug);

    console.log("params:", slug);

    if (!category) {
        return <div>Category not found</div>;
    }

    const lakes = await getLakesByCategoryId(category.id);
    

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">

            <div className="mb-6 sm:mb-8">
  
  {/* Breadcrumbs */}
  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 flex-wrap">
    
    <ProgressLink href="/" className="hover:text-teal-600 transition">
      Home
    </ProgressLink>

    <ChevronRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" />

    <ProgressLink href="/lake-categories" className="hover:text-teal-600 transition">
      Lake Categories
    </ProgressLink>

    <ChevronRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" />

    {/* Prevent long category names from breaking layout */}
    <span className="text-gray-700 font-medium truncate max-w-35 sm:max-w-none">
      {category.name}
    </span>

  </div>

  {/* Title with accent */}
  <div className="flex items-start gap-3">
    
    {/* Accent line (responsive height) */}
    <div className="w-1.5 h-8 sm:h-10 bg-teal-600 rounded-full mt-1 shrink-0" />
    
    <div className="min-w-0">
      
      {/* Responsive title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight wrap-break-words">
        {category.name}
      </h1>

      {/* Responsive description */}
      <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-full sm:max-w-xl leading-relaxed">
        Explore lakes under this category and their unique features.
      </p>

    </div>
  </div>

</div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {lakes.map((lake: any) => {
                    const image =
                        lake._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/placeholder.jpg";

                    const description =
                        lake.excerpt?.rendered || lake.content?.rendered || "";

                    const acf = lake.acf || {};

                    const barangay = acf.barangay?.value;
                    const distance = acf.distance_from_city_proper?.value;
                    const depth = acf.maximum_depth?.value;
                    const area = acf.surface_area?.value;

                    return (
                        <div
                            key={lake.id}
                            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden 
                    hover:shadow-md transition duration-300 flex flex-col"
                        >
                            {/* Image */}
                            <div className="overflow-hidden">
                                <img
                                    src={image}
                                    alt={lake.title.rendered}
                                    className="w-full h-48 object-cover group-hover:scale-[1.03] transition duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">

                                {/* Title with icon */}
                                <div className="flex items-center gap-2">
                                    <FiDroplet className="text-[#0F766E] text-lg" />
                                    <h2 className="font-semibold text-lg text-[#0F766E] group-hover:text-[#2fbaae] transition">
                                        {lake.title.rendered}
                                    </h2>
                                </div>

                                {/* ACF INFO */}
                                <div className="mt-3 text-xs text-gray-500 space-y-1">

                                    <div className="mt-3 text-xs text-gray-500 space-y-2">

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

                                </div>

                                {/* Description */}
                                <div
                                    className="text-xs text-gray-500 mt-4 line-clamp-3 flex-1 text-justify"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />

                                {/* Button */}
                                <div className="mt-4">
                                    <ProgressLink href={`/lakes/${lake.slug}`}>
                                        <button className="flex gap-2 cursor-pointer items-center w-full py-2 text-left rounded-lg text-white custom-primary 
                                hover:opacity-90 transition font-medium">
                                            View Full Details
                                            <IoArrowForward />
                                        </button>
                                    </ProgressLink>
                                </div>

                            </div>
                        </div>
                    );
                })}



            </div>

            <div className="flex flex-col lg:flex-row gap-6 mt-10 items-stretch">

                {/* LEFT: Description */}
                <div className="lg:w-1/2">
                    <h1 className="text-2xl text-gray-900 mb-2">
                        About the {category.name}
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-justify ">
                        {category.description}
                    </p>
                </div>

                {/* RIGHT: Stats Grid */}
                <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">

                    {/* Card */}
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-blue-50 border border-blue-200 h-full">
                        <div className="text-blue-600 text-2xl">
                            <FiMapPin />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800">12</h2>
                            <p className="text-sm text-gray-500">
                                Interconnected Crater Lakes
                            </p>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-green-50 border border-green-200 h-full">
                        <div className="text-green-600 text-2xl">
                            <FiUsers />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800">5</h2>
                            <p className="text-sm text-gray-500">
                                Partner Institutions
                            </p>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-yellow-50 border border-yellow-200 h-full">
                        <div className="text-yellow-600 text-2xl">
                            <FiClock />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800">20+</h2>
                            <p className="text-sm text-gray-500">
                                Years of Research
                            </p>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-purple-50 border border-purple-200 h-full">
                        <div className="text-purple-600 text-2xl">
                            <RiLeafFill />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800">8</h2>
                            <p className="text-sm text-gray-500">
                                Conservation Projects
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-12">

                {/* Title */}
                <h2 className="text-2xl text-gray-900 mb-6">
                    Our Research Focus Areas
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Water Quality */}
                    <div className="p-5 rounded-xl bg-blue-50 border border-blue-100 hover:shadow-md transition">
                        <div className="text-blue-600 text-2xl mb-3">
                            <FiDroplet />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Water Quality</h3>
                        <p className="text-sm text-gray-600">
                            Monitoring physical and chemical properties of water to ensure safety,
                            sustainability, and ecosystem health.
                        </p>
                    </div>

                    {/* Biodiversity */}
                    <div className="p-5 rounded-xl bg-green-50 border border-green-100 hover:shadow-md transition">
                        <div className="text-green-600 text-2xl mb-3">
                            <FiFeather />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Biodiversity</h3>
                        <p className="text-sm text-gray-600">
                            Studying the variety of life forms within ecosystems to understand species
                            interactions and ecological balance.
                        </p>
                    </div>

                    {/* Conservation */}
                    <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-100 hover:shadow-md transition">
                        <div className="text-emerald-600 text-2xl mb-3">
                            <RiLeafFill />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Conservation</h3>
                        <p className="text-sm text-gray-600">
                            Developing strategies to protect natural resources, restore habitats,
                            and preserve ecosystems for future generations.
                        </p>
                    </div>

                    {/* Climate Impact */}
                    <div className="p-5 rounded-xl bg-sky-50 border border-sky-100 hover:shadow-md transition">
                        <div className="text-sky-600 text-2xl mb-3">
                            <FiCloud />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Climate Impact</h3>
                        <p className="text-sm text-gray-600">
                            Assessing the effects of climate change on ecosystems, water systems,
                            and environmental resilience.
                        </p>
                    </div>

                </div>

            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-gray-200">

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
                    Partners
                </h2>

                {/* Logos */}
                <div className="flex flex-wrap justify-center items-center gap-10 mb-6">

                    {[1, 2, 3, 4, 5].map((num) => (
                        <div
                            key={num}
                            className="flex items-center justify-center p-3 rounded-xl "
                        >
                            <img
                                src={`/images/${num}.png`}
                                alt={`Partner ${num}`}
                                className="h-12 object-contain"
                            />
                        </div>
                    ))}

                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed max-w-4xl mx-auto text-center">
                    This project was implemented by the College of Public Affairs and Development,
                    University of the Philippines made possible by the Philippine Council for Agriculture,
                    Aquatic and Natural Resources Research and Development (PCAARRD) and in cooperation
                    with the Local Government Units of San Pablo City, Laguna, and Laguna Lake Development Authority.
                </p>

            </div>
        </div>
    );
}
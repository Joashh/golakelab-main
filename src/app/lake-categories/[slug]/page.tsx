import ProgressLink from "@/app/component/progresslink";
import Link from "next/link";
import { FiMapPin, FiSun, FiUsers, FiCloud, FiFeather, FiClock, FiTrendingDown, FiLayers, FiDroplet } from "react-icons/fi";
import { RiLeafFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { FaRulerHorizontal } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import LakeGrid from "@/app/component/wrappercard";
import SmileySurvey from "@/app/component/smileysurvey";
import RelatedNews from "@/app/component/relatednews";
import RelatedJournal from "@/app/component/relatesJournal";
import { CategoryPage } from "./CategoryPage";



type Params = {
    params: Promise<{
        slug: string;
    }>;
};
interface Partner {
    id: number;
    title: { rendered: string };
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
        }>;
    };
}

interface Props {
    slug: string;
}





async function getCategoryBySlug(slug: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake-category?slug=${slug}`,
        { cache: "no-store" }
    );

    const data = await res.json();
    return data[0];
}

async function getPartnersByCategoryId(categoryId: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/partner?lake-category=${categoryId}&_embed&order=asc&orderby=date`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
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
    const lakes: any[] = await getLakesByCategoryId(category.id);


    const partners: Partner[] = await getPartnersByCategoryId(category.id);
    const description = category.acf?.partner_description?.value_formatted
        || category.acf?.partner_description?.value
        || "";
    const yearsofresearch =
        category.acf?.years_of_research?.value_formatted?.toString() ||
        category.acf?.years_of_research?.value?.toString() ||
        "N/A";
    const interconnected =
        category.acf?.
            interconnected_crater_lakes?.value_formatted?.toString() ||
        category.acf?.
            interconnected_crater_lakes?.value?.toString() ||
        "N/A";
    const partnerinsti =
        category.acf?.
            partner_institutions?.value_formatted?.toString() ||
        category.acf?.
            partner_institutions?.value?.toString() ||
        "N/A";
    const conservationproj =
        category.acf?.
            conservation_projects?.value_formatted?.toString() ||
        category.acf?.
            conservation_projects?.value?.toString() ||
        "N/A";
    const aboutregion =
        category.acf?.
            about_this_region?.value_formatted?.toString() ||
        category.acf?.
            about_this_region?.value?.toString() ||
        "N/A";

    return  <CategoryPage
                category={category}
                lakes={lakes}
                partners={partners}
                description={description}
                yearsofresearch={yearsofresearch}
                interconnected={interconnected}
                partnerinsti={partnerinsti}
                conservationproj={conservationproj}
                aboutthisregion={aboutregion}
            />

            {/*
            <div className="mb-6 sm:mb-8">

             
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 flex-wrap">

                    <ProgressLink href="/" className="hover:text-teal-600 transition">
                        Home
                    </ProgressLink>

                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" />

                    <ProgressLink href="/lake-categories" className="hover:text-teal-600 transition">
                        Lake Categories
                    </ProgressLink>

                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" />

                    <span className="text-gray-700 dark:text-white/80 font-medium truncate max-w-35 sm:max-w-none">
                        {category.name}
                    </span>

                </div>

                
                <div className="flex items-start gap-3">

                    <div className="w-1.5 h-8 sm:h-10 bg-teal-600 rounded-full mt-1 shrink-0" />

                    <div className="min-w-0">

                     
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight wrap-break-words">
                            {category.name}
                        </h1>

                     
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-full sm:max-w-xl leading-relaxed">
                            Explore lakes under this category and their unique features.
                        </p>

                    </div>
                </div>

            </div>

            <LakeGrid lakes={lakes} />

            <div className="flex flex-col lg:flex-row gap-6 mt-10 items-stretch">

            
                <div className="lg:w-1/2">
                    <h1 className="text-2xl text-gray-900 dark:text-white mb-2">
                        About the {category.name}
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-justify dark:text-white/70 ">
                        {category.description}
                    </p>
                </div>

              
                <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">

                  
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 h-full">
                        <div className="text-blue-600 dark:text-blue-400 text-2xl">
                            <FiMapPin />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{interconnected}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Interconnected Crater Lakes
                            </p>
                        </div>
                    </div>

                 
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 h-full">
                        <div className="text-green-600 dark:text-green-400 text-2xl">
                            <FiUsers />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{partnerinsti}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Partner Institutions
                            </p>
                        </div>
                    </div>

                   
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 h-full">
                        <div className="text-yellow-600 dark:text-yellow-400 text-2xl">
                            <FiClock />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{yearsofresearch}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Years of Research
                            </p>
                        </div>
                    </div>

                    
                    <div className="flex flex-col justify-between p-5 rounded-xl bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 h-full">
                        <div className="text-purple-600 dark:text-purple-400 text-2xl">
                            <RiLeafFill />
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{conservationproj}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Conservation Projects
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-12">

                
                <h2 className="text-2xl text-gray-900 dark:text-white mb-6">
                    Our Research Focus Areas
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    
                    <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-700 hover:shadow-md transition">
                        <div className="text-blue-600 dark:text-blue-400 text-2xl mb-3">
                            <FiDroplet />
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Water Quality</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Monitoring physical and chemical properties of water to ensure safety,
                            sustainability, and ecosystem health.
                        </p>
                    </div>

                 
                    <div className="p-5 rounded-xl bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-700 hover:shadow-md transition">
                        <div className="text-green-600 dark:text-green-400 text-2xl mb-3">
                            <FiFeather />
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Biodiversity</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Studying the variety of life forms within ecosystems to understand species
                            interactions and ecological balance.
                        </p>
                    </div>

                    
                    <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-700 hover:shadow-md transition">
                        <div className="text-emerald-600 dark:text-emerald-400 text-2xl mb-3">
                            <RiLeafFill />
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Conservation</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Developing strategies to protect natural resources, restore habitats,
                            and preserve ecosystems for future generations.
                        </p>
                    </div>

                  
                    <div className="p-5 rounded-xl bg-sky-50 dark:bg-sky-900 border border-sky-100 dark:border-sky-700 hover:shadow-md transition">
                        <div className="text-sky-600 dark:text-sky-400 text-2xl mb-3">
                            <FiCloud />
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Climate Impact</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Assessing the effects of climate change on ecosystems, water systems,
                            and environmental resilience.
                        </p>
                    </div>

                </div>

            </div>

            <RelatedNews categoryId={category.id} />

            <RelatedJournal categoryId={category.id} />

            <div className="mt-10 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-800 border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
                    Partners
                </h2>

                
                <div className="flex flex-wrap justify-center items-center gap-10 mb-6">
                    {partners.map((partner) => {
                        // Get featured image URL safely
                        const logoUrl =
                            partner._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

                        return (
                            <div
                                key={partner.id}
                                className="flex items-center justify-center p-3 rounded-xl"
                            >
                                {logoUrl && (
                                    <img
                                        src={logoUrl}
                                        alt={partner.title.rendered}
                                        className="h-12 object-contain"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                
                {description && (
                    <p className="text-sm text-gray-600 dark:text-white/70  leading-relaxed max-w-4xl mx-auto text-center">
                        {description}
                    </p>
                )}
            </div>
            <SmileySurvey />
            */}
        
    ;
}
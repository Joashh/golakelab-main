import LakeDetailPage from "./LakeDetailPage";
import { getLakeBySlug } from "@/app/lib/data";
import { getSectionTypes } from "@/app/lib/data";
import { getLakeSections } from "@/app/lib/data";
import { normalizeLake } from "@/app/lib/data";
type Params = {
  params: {
    slug: string;
  };
};


export default async function Page({ params }: Params) {
  const { slug } = await params;

  const rawLake = await getLakeBySlug(slug);

  if (!rawLake) {
    return <div>Lake not found</div>;
  }

  const lakeSections = await getLakeSections(rawLake.id);

  const { lake, grouped, tabs } = normalizeLake(rawLake, lakeSections);

  return (
    <LakeDetailPage
      data={{
        lake,
        sections: grouped,
        tabs,
        metadata: lake.metadata,
        category: lake.category,
        image: lake.image,
      }}
    />
  );
}

{/*(
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">


      
      <div className="relative h-72 md:h-80">

     
        <img src={image} className="w-full h-full object-cover" />

       
        <div className="absolute inset-0 bg-black/60" />

       
        <div className="absolute inset-0 flex items-center">

          <div className="max-w-7xl mx-auto px-6 w-full text-white">



       
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              {lake.title.rendered}
            </h1>

         
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

              <span className="text-white font-medium truncate max-w-50 sm:max-w-none">
                {lake.title.rendered}
              </span>

            </div>


          </div>
        </div>
      </div>

      <div className="max-w-7xl  mx-auto -mt-10 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-100 dark:border-gray-700">

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

     
      <div className="max-w-7xl mx-auto  py-10 flex flex-col gap-8">


        <div className="space-y-8">

         
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">

            <div className="flex flex-col md:flex-row gap-6">

              <div className="shrink-0">
                <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={lake.title.rendered}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">

               
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                  
                  <h3 className="text-2xl font-semibold text-[#0F766E] dark:text-teal-200">
                    {lake.title.rendered}
                  </h3>

                  <LakeActions />
                </div>

                
                {barangay && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <span><FaLocationDot className="dark:text-teal-300" /></span>
                    <span>{barangay}</span>
                  </p>
                )}

               
                <div className="border-t border-gray-100 dark:border-gray-600" />

                
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

       
          <div className="bg-white relative dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">

            {tabs.length > 0 && <Overlay />}
            {tabs.length === 0 && <h1 className="text-center text-gray-500">No data retrieved</h1>}

            {tabs.length > 0 && <Tabs grouped={grouped} tabs={tabs} />}
          </div>

        </div>

      </div>

      <SmileySurvey />

    </div>
  );
  */}

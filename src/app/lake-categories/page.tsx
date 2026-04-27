import ProgressLink from "@/app/component/progresslink";
import { ArrowRight, Droplets } from 'lucide-react';
import { getCategories } from "../lib/data";


export default async function LakeCategories() {
  const categories = await getCategories();

  return (

    <div className="min-h-screen flex flex-col bg-linear-to-br from-sky-50 via-white to-emerald-50">

      {/* Hero Section */}
      <section className="relative bg-linear-to-br  from-sky-600 via-blue-600 to-emerald-600 text-white py-16">
        <div className="absolute inset-0 opacity-10 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${'images/Balinsasayao_Twin_Lakes.JPG'})` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Droplets className="size-4" />
              <span className="text-sm">Explore Philippine Small Lakes</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Our Lakes
            </h1>

            <p className="text-xl text-sky-100 max-w-3xl mx-auto">
              Discover detailed information about lake ecosystems and their biodiversity
            </p>
          </div>

        </div>
      </section>


      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* List Container */}
        <div className="space-y-4 grid md:grid-cols-2 gap-8 items-stretch">

          {categories.map((cat) => (
            <ProgressLink
              key={cat.id}
              href={`/lake-categories/${cat.slug}`}
              className="group relative h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all"
            >

              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img
                  src={cat.image || "/placeholder.jpg"}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between p-8">

                <div>

                  <div className="flex items-center justify-between gap-3">

                    <h2 className="text-lg font-semibold text-gray-900  dark:group-hover:text-[#2bc3b6] group-hover:text-[#0F766E] transition line-clamp-1">
                      {cat.name}
                    </h2>

                    {cat.count !== undefined && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 whitespace-nowrap">
                        {cat.count}
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {cat.description || "No description available"}
                  </p>

                </div>

                {/* Bottom Row */}
                <div
                  className="inline-flex self-start items-center gap-2 px-6 py-3 bg-linear-to-r mt-6 from-sky-600 to-emerald-600 text-white rounded-xl hover:from-sky-700 hover:to-emerald-700 transition-all group shadow-lg shadow-sky-200"
                >
                  <span>Explore Lakes</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>

            </ProgressLink>
          ))}

        </div>

      </main>
    </div>
  );
}
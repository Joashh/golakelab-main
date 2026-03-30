import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProgressLink from "../component/progresslink";

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count?: number; // ?? add this
};

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/lake-category`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export default async function LakeCategories() {
  const categories = await getCategories();

  return (

    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

  {/* Header */}
  <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    {/* Breadcrumb */}
    <div className="flex items-center text-sm text-gray-500">

      <ProgressLink href="/" className="hover:text-gray-700 transition">
        Home
      </ProgressLink>

      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />

      <span className="text-gray-700 font-medium">
        Lake Categories
      </span>

    </div>

    <span className="text-xs sm:text-sm text-gray-400">
      {categories.length} categories
    </span>

  </div>

  {/* List Container */}
  <div className="space-y-4">

    {categories.map((cat) => (
      <ProgressLink
        key={cat.id}
        href={`/lake-categories/${cat.slug}`}
        className="group flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition"
      >

        {/* Image */}
        <div className="relative w-full sm:w-56 h-40 shrink-0 overflow-hidden rounded-lg">
          <img
            src={cat.image || "/placeholder.jpg"}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">

          <div>

            <div className="flex items-center justify-between gap-3">

              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#0F766E] transition line-clamp-1">
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
          <div className="mt-3 flex items-center justify-between text-sm">

            <span className="text-gray-400">
              View details
            </span>

            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition" />

          </div>

        </div>

      </ProgressLink>
    ))}

  </div>
</div>
  );
}
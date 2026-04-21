import ProgressLink from './progresslink';
import { MapPin, Waves, Fish, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';


interface LakeCardProps {
  id: string|number;
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  barangays: string[];
  maxDepth: number;
  fishSpecies: string[];
}

export function LakeCard({ id, name, image, slug, shortDescription, barangays, maxDepth, fishSpecies }: LakeCardProps) {
  const imageUrl = image || "/placeholder.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{name}</h3>
      </div>

      <div className="p-5">
        <p className="text-slate-600 text-sm mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: shortDescription }}></p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <MapPin className="size-4 text-sky-500" />
            <span className="line-clamp-1">{barangays.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Waves className="size-4 text-blue-500" />
            <span>Max Depth: {maxDepth}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Fish className="size-4 text-emerald-500" />
            <span className="line-clamp-1">{fishSpecies.length} species</span>
          </div>
        </div>

        <ProgressLink
          href={`/lakes/${slug}`}
          className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-slate-600 to-slate-700 text-white py-2.5 rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all group"
        >
          <span>Explore Details</span>
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </ProgressLink>
      </div>
    </motion.div>
  );
}
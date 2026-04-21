import ProgressLink from './progresslink';
import { MapPin, Droplets } from 'lucide-react';
import { useState } from 'react';

interface LakeMapPoint {
  id: string;
   slug: string;
  name: string;
  x: number;
  y: number;
  depth: number;
  area: number;
}

interface LakesMapProps {
  points: LakeMapPoint[];
}

export function LakesMap({ points }: LakesMapProps) {
  const [hoveredLake, setHoveredLake] = useState<string | null>(null);

  

  return (
    <div className="bg-linear-to-br from-blue-50 via-sky-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-slate-300 relative overflow-hidden">
      {/* Map Header */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="size-6 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">Map Title</h3>
        </div>
        <p className="text-sm text-slate-600">Map Location</p>
      </div>

      {/* Interactive Map Area */}
      <div className="relative bg-gradient-to-br from-emerald-100 via-blue-100 to-sky-100 rounded-xl h-96 border-2 border-slate-300 shadow-inner">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.5" fill="#1e40af" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />
          </svg>
        </div>

        {/* Decorative elements - roads/paths */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="30%" x2="90%" y2="40%" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="20%" y1="10%" x2="70%" y2="90%" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="80%" y1="20%" x2="30%" y2="80%" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Lake markers */}
        {points.map((lake) => (
          <ProgressLink
            key={lake.id}
            href={`/lakes/${lake.slug}`}
            className="absolute group cursor-pointer"
            style={{
              left: `${lake.x}%`,
              top: `${lake.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredLake(lake.id)}
            onMouseLeave={() => setHoveredLake(null)}
          >
            {/* Lake marker - ripple effect */}
            <div className="relative">
              {/* Outer ripple */}
              <div className={`absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30 ${hoveredLake === lake.id ? 'scale-150' : ''}`}
                style={{ width: '40px', height: '40px', left: '-12px', top: '-12px' }} />

              {/* Lake pin */}
              <div className="relative z-10">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg group-hover:scale-150 group-hover:bg-sky-500 transition-all duration-300" />
              </div>

              {/* Tooltip */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 transition-all duration-300 ${hoveredLake === lake.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}
              >
                <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-3 min-w-[160px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="size-4 text-blue-600" />
                    <p className="font-bold text-slate-900 text-sm">{lake.name} Lake</p>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600">
                    <p>Max Depth: <span className="font-semibold text-slate-900">{lake.depth}</span></p>
                    <p>Area: <span className="font-semibold text-slate-900">{lake.area}</span></p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-xs text-blue-600 font-medium">Click to explore →</p>
                  </div>
                  {/* Arrow pointer */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                </div>
              </div>
            </div>

            {/* Lake label (always visible on desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap hidden md:block">
              <span className="text-xs font-semibold text-slate-700 bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                {lake.name}
              </span>
            </div>
          </ProgressLink>
        ))}

        {/* Compass */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs font-bold text-slate-700">N</div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-1 h-6 bg-red-500 rounded-full" style={{ transform: 'rotate(0deg)' }} />
            </div>
            <div className="absolute inset-0 border-2 border-slate-300 rounded-full" />
          </div>
        </div>

        {/* Scale indicator */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-slate-700 relative">
              <div className="absolute left-0 top-0 w-0.5 h-2 bg-slate-700 -translate-y-1/2" />
              <div className="absolute right-0 top-0 w-0.5 h-2 bg-slate-700 -translate-y-1/2" />
            </div>
            <span className="text-xs font-medium text-slate-700">~ 5 km</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow" />
          <span className="text-slate-700">Lake Location</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="20" height="2">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3" />
          </svg>
          <span className="text-slate-700">Major Roads</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-blue-600" />
          <span className="text-slate-700">Hover for details</span>
        </div>
      </div>

      {/* Info note */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500 italic">
          Approximate relative positions • Click on any lake to view detailed information
        </p>
      </div>
    </div>
  );
}

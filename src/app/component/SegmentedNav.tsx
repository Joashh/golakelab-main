import { Info, Map, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface SegmentedNavProps {
  onSectionChange: (section: 'about' | 'explore' | 'engage') => void;
  activeSection: 'about' | 'explore' | 'engage';
}
type Color = 'sky' | 'emerald' | 'blue';
export function SegmentedNav({ onSectionChange, activeSection }: SegmentedNavProps) {
  const sections: {
    id: 'about' | 'explore' | 'engage';
    icon: any;
    title: string;
    color: Color;
  }[] = [
      {
        id: 'about' as const,
        icon: Info,
        title: 'What This is About',
        color: 'sky'
      },
      {
        id: 'explore' as const,
        icon: Map,
        title: 'Explore Small Lakes',
        color: 'emerald'
      },
      {
        id: 'engage' as const,
        icon: Users,
        title: 'Engage in Community',
        color: 'blue'
      }
    ];

  // ✅ Tailwind-safe color mapping
  const colorClasses = {
    sky: {
      bg: 'from-sky-50 to-sky-100',
      border: 'border-sky-300',
      icon: 'from-sky-500 to-sky-600',
      indicator: 'bg-sky-500'
    },
    emerald: {
      bg: 'from-emerald-50 to-emerald-100',
      border: 'border-emerald-300',
      icon: 'from-emerald-500 to-emerald-600',
      indicator: 'bg-emerald-500'
    },
    blue: {
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-300',
      icon: 'from-blue-500 to-blue-600',
      indicator: 'bg-blue-500'
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const colors = colorClasses[section.color];

          return (
            <motion.button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`relative p-6 rounded-xl transition-all ${isActive
                  ? `bg-linear-to-br ${colors.bg} border-2 ${colors.border}`
                  : 'bg-slate-50 border-2 border-transparent hover:border-slate-200'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className={`p-3 rounded-full ${isActive
                      ? `bg-linear-to-br ${colors.icon}`
                      : 'bg-slate-200'
                    }`}
                >
                  <Icon className={`size-6 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </div>

                <h3
                  className={`font-semibold ${isActive ? 'text-slate-900' : 'text-slate-700'
                    }`}
                >
                  {section.title}
                </h3>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full ${colors.indicator}`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
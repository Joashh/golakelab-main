import { Filter } from 'lucide-react';

interface FilterBarProps {
  depthFilter: string;
  onDepthFilterChange: (value: string) => void;
}

export function FilterBar({ depthFilter, onDepthFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-slate-700">
        <Filter className="size-4" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>
      
      <select
        value={depthFilter}
        onChange={(e) => onDepthFilterChange(e.target.value)}
        className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
      >
        <option value="all">All Depths</option>
        <option value="shallow">Shallow (&lt; 40m)</option>
        <option value="medium">Medium (40-60m)</option>
        <option value="deep">Deep (&gt; 60m)</option>
      </select>
    </div>
  );
}

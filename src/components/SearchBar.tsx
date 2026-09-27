import { Search, Bell } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="sticky top-14 lg:top-0 z-30 bg-stone-950/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search movies, shows, genres..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-stone-800 border border-stone-700 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-sf-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="relative w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors shrink-0">
          <Bell className="w-5 h-5 text-stone-300" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sf-500 to-sf-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
          U
        </div>
      </div>
    </div>
  );
}

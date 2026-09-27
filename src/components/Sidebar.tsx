import { Play, Home, TrendingUp, Compass, Heart, Clock, Settings, Tv } from 'lucide-react';
import { categories } from '@/data/movies';

interface SidebarProps {
  active: string;
  onChange: (id: string) => void;
  watchlistCount: number;
}

const navItems = [
  { id: 'all', name: 'Home', icon: Home },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
];

const browseItems = categories.filter(c => !['all', 'trending'].includes(c.id));

export default function Sidebar({ active, onChange, watchlistCount }: SidebarProps) {
  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sf-500 to-sf-700 flex items-center justify-center">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              Stream<span className="text-sf-500">Flix</span>
            </span>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-4 pb-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                active === cat.id
                  ? 'bg-white text-stone-900'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-stone-900 border-r border-stone-800 flex-col z-40">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sf-500 to-sf-700 flex items-center justify-center shadow-lg shadow-sf-500/30">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              Stream<span className="text-sf-500">Flix</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1">
          <p className="px-3 text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Menu</p>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.id
                    ? 'bg-sf-500 text-white'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}

          <p className="px-3 text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2 mt-6">Browse</p>
          {browseItems.map(item => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sf-500 text-white'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Compass className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}

          <p className="px-3 text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2 mt-6">Library</p>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" />
              Watchlist
            </div>
            {watchlistCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-sf-500/20 text-sf-400 text-xs font-bold">
                {watchlistCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer transition-all">
            <Clock className="w-5 h-5" />
            History
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </div>
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sf-500 text-white font-semibold text-sm hover:bg-sf-600 transition-all">
            <Play className="w-4 h-4 fill-white" /> Go Premium
          </button>
        </div>
      </aside>
    </>
  );
}

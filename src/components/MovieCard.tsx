import { useState } from 'react';
import { Play, Plus, Check, Star, Clock } from 'lucide-react';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  onClick: (m: Movie) => void;
  inWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
}

export default function MovieCard({ movie, onClick, inWatchlist, onToggleWatchlist }: MovieCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-stone-800 border border-stone-700/50 group-hover:border-sf-500/50 transition-all">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 animate-shimmer" style={{ backgroundSize: '1000px 100%' }} />
        )}
        <img
          src={movie.image}
          alt={movie.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {movie.isNew && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">
            NEW
          </span>
        )}
        {movie.trending && !movie.isNew && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-sf-500 text-white text-xs font-bold shadow-lg">
            HOT
          </span>
        )}

        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400" />
          {movie.rating}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onClick(movie); }}
            className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
          >
            <Play className="w-6 h-6 fill-stone-900" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie.id); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              inWatchlist
                ? 'bg-sf-500 text-white'
                : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
            }`}
          >
            {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {inWatchlist ? 'Added' : 'Watchlist'}
          </button>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-sm font-semibold text-stone-200 truncate group-hover:text-white transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
          <span>{movie.year}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" /> {movie.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

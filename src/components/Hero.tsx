import { Play, Plus, Star, Calendar, Clock } from 'lucide-react';
import type { Movie } from '@/types';

interface HeroProps {
  movie: Movie;
  onPlay: (m: Movie) => void;
  onAddWatchlist: (id: string) => void;
  inWatchlist: boolean;
}

export default function Hero({ movie, onPlay, onAddWatchlist, inWatchlist }: HeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />

      <div className="relative h-full flex items-end pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-sf-500 text-white text-xs font-bold uppercase tracking-wide">
              Featured
            </span>
            {movie.isNew && (
              <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-wide">
                New
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 mb-4 text-sm text-stone-300">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {movie.rating}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {movie.year}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {movie.duration}
            </span>
            <div className="hidden sm:flex gap-2">
              {movie.genres.map(g => (
                <span key={g} className="px-2 py-0.5 rounded-full bg-white/10 text-stone-300 text-xs">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <p className="text-stone-300 text-base leading-relaxed mb-6 line-clamp-3 max-w-xl">
            {movie.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onPlay(movie)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 font-semibold hover:bg-stone-200 active:scale-95 transition-all shadow-lg"
            >
              <Play className="w-5 h-5 fill-stone-900" /> Play Now
            </button>
            <button
              onClick={() => onAddWatchlist(movie.id)}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all active:scale-95 ${
                inWatchlist
                  ? 'bg-sf-500 text-white hover:bg-sf-600'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <Plus className="w-5 h-5" />
              {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

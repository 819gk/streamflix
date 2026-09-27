import { useState, useEffect } from 'react';
import { X, Play, Plus, Check, Star, Calendar, Clock, Share2 } from 'lucide-react';
import type { Movie } from '@/types';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  inWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
}

export default function MovieModal({ movie, onClose, inWatchlist, onToggleWatchlist }: MovieModalProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (movie) setPlaying(false);
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative bg-stone-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in border border-stone-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-stone-800/80 backdrop-blur-sm hover:bg-stone-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Backdrop / Player */}
        <div className="relative aspect-video rounded-t-2xl overflow-hidden bg-stone-800">
          {playing ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950">
              <div className="w-20 h-20 rounded-full bg-sf-500/20 flex items-center justify-center mb-4 animate-pulse">
                <Play className="w-10 h-10 text-sf-400 fill-sf-400" />
              </div>
              <p className="text-stone-400 text-sm">Now playing: {movie.title}</p>
              <p className="text-stone-600 text-xs mt-1">Streaming preview (demo mode)</p>
              <div className="mt-6 w-full max-w-xs px-8">
                <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sf-500 rounded-full animate-pulse" style={{ width: '35%' }} />
                </div>
                <div className="flex justify-between text-xs text-stone-600 mt-2">
                  <span>0:42</span>
                  <span>{movie.duration}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 flex items-center justify-center transition-all shadow-2xl">
                  <Play className="w-8 h-8 text-stone-900 fill-stone-900" />
                </div>
              </button>
            </>
          )}
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                {movie.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-stone-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-white">{movie.rating}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {movie.year}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {movie.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {movie.genres.map(g => (
              <span key={g} className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-medium">
                {g}
              </span>
            ))}
          </div>

          <p className="text-stone-300 leading-relaxed mb-6">
            {movie.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPlaying(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white text-stone-900 font-semibold hover:bg-stone-200 active:scale-95 transition-all shadow-lg"
            >
              <Play className="w-5 h-5 fill-stone-900" /> Play
            </button>
            <button
              onClick={() => onToggleWatchlist(movie.id)}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all active:scale-95 ${
                inWatchlist
                  ? 'bg-sf-500 text-white hover:bg-sf-600'
                  : 'bg-stone-800 text-white border border-stone-700 hover:bg-stone-700'
              }`}
            >
              {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
            <button className="w-12 h-12 sm:w-auto sm:px-4 rounded-full bg-stone-800 text-stone-300 border border-stone-700 hover:bg-stone-700 flex items-center justify-center transition-all active:scale-95">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

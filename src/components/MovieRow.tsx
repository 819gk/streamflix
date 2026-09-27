import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (m: Movie) => void;
  watchlist: { has: (id: string) => boolean; toggle: (id: string) => void };
}

export default function MovieRow({ title, movies, onMovieClick, watchlist }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (movies.length === 0) return null;

  return (
    <div className="group/row">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-3">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-white">{title}</h2>
        <div className="hidden sm:flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-stone-300" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-stone-300" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-2 scroll-smooth"
      >
        {movies.map(movie => (
          <div key={movie.id} className="shrink-0 w-40 sm:w-48 md:w-52">
            <MovieCard
              movie={movie}
              onClick={onMovieClick}
              inWatchlist={watchlist.has(movie.id)}
              onToggleWatchlist={watchlist.toggle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

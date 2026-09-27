import { useState, useMemo } from 'react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { movies, categories } from '@/data/movies';
import type { Movie } from '@/types';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import MovieCard from '@/components/MovieCard';
import MovieModal from '@/components/MovieModal';
import SearchBar from '@/components/SearchBar';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const watchlist = useWatchlist();

  const trending = movies.filter(m => m.trending);
  const newReleases = movies.filter(m => m.isNew);
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 8);

  const filteredMovies = useMemo(() => {
    return movies.filter(m => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'trending' && m.trending) ||
        m.category === activeCategory;
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const watchlistMovies = movies.filter(m => watchlist.ids.has(m.id));

  const isSearching = searchQuery.length > 0;
  const isFiltering = activeCategory !== 'all';

  return (
    <div className="min-h-screen bg-stone-950 flex">
      <Sidebar
        active={activeCategory}
        onChange={setActiveCategory}
        watchlistCount={watchlistMovies.length}
      />

      <div className="flex-1 lg:ml-64 min-w-0">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {isSearching || isFiltering ? (
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              {isSearching ? `Results for "${searchQuery}"` : `${categories.find(c => c.id === activeCategory)?.name} Movies`}
            </h2>
            {filteredMovies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-stone-500 text-lg">No movies found. Try a different search!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={setSelectedMovie}
                    inWatchlist={watchlist.has(movie.id)}
                    onToggleWatchlist={watchlist.toggle}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <Hero movie={trending[0] ?? movies[0]} onPlay={setSelectedMovie} onAddWatchlist={watchlist.toggle} inWatchlist={watchlist.has(trending[0]?.id ?? '')} />

            <div className="space-y-8 pb-12">
              <MovieRow title="Trending Now" movies={trending} onMovieClick={setSelectedMovie} watchlist={watchlist} />
              <MovieRow title="New Releases" movies={newReleases} onMovieClick={setSelectedMovie} watchlist={watchlist} />
              <MovieRow title="Top Rated" movies={topRated} onMovieClick={setSelectedMovie} watchlist={watchlist} />

              {watchlistMovies.length > 0 && (
                <MovieRow title="My Watchlist" movies={watchlistMovies} onMovieClick={setSelectedMovie} watchlist={watchlist} />
              )}

              <div className="px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">All Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {movies.map(movie => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={setSelectedMovie}
                      inWatchlist={watchlist.has(movie.id)}
                      onToggleWatchlist={watchlist.toggle}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        inWatchlist={selectedMovie ? watchlist.has(selectedMovie.id) : false}
        onToggleWatchlist={watchlist.toggle}
      />
    </div>
  );
}

export default App;

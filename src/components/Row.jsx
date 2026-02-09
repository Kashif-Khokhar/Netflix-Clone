import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { Plus, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import { motion } from "framer-motion";

import { sampleMovies } from "../api/sampleData";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow, handleClick, initialMovies }) {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const listRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  // Derive movies: use initialMovies if provided, otherwise use fetchedMovies
  // Fallback to shuffled sampleMovies if both are empty to create variety across rows
  const [shuffledSample] = useState(() => [...sampleMovies].sort(() => Math.random() - 0.5));
  const movies = initialMovies || (fetchedMovies.length > 0 ? fetchedMovies : shuffledSample);

  useEffect(() => {
    if (initialMovies) return;
    
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setFetchedMovies(request.data.results);
      } catch (error) {
        console.error("Fetch error, using fallback data:", error);
      }
    }
    fetchData();
  }, [fetchUrl, initialMovies]);

  const scroll = (direction) => {
    if (listRef.current) {
      const { scrollLeft, clientWidth } = listRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth + 200 : scrollLeft + clientWidth - 200;
      listRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${base_url}${path}`;
  };

  return (
    <div 
      className="ml-5 md:ml-10 text-white group mb-10" 
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-netflix-red transition-colors duration-300">
        {title}
      </h2>

      <div className="relative flex items-center min-h-[150px]">
        {movies.length === 0 && !initialMovies && (
          <p className="text-gray-500 text-sm ml-2">No movies found. Check your TMDB API Key in requests.js</p>
        )}
        {showArrows && movies.length > 0 && (
           <button 
           className="absolute left-0 z-40 bg-black/50 p-2 h-full opacity-0 group-hover:opacity-100 transition-opacity"
           onClick={() => scroll("left")}
         >
           <ChevronLeft className="w-8 h-8" />
         </button>
        )}

        <div 
          ref={listRef}
          className="row-posters hide-scrollbar flex space-x-3 overflow-x-scroll py-5"
        >
          {movies.map((movie) => (
            <motion.div 
              key={movie.id} 
              className="relative min-w-[160px] md:min-w-[240px] cursor-pointer"
              whileHover={{ 
                scale: 1.15,
                zIndex: 50,
                transition: { duration: 0.3 }
              }}
            >
              <img
                onClick={() => handleClick(movie)}
                className={`w-full object-cover rounded-md shadow-md transition-shadow duration-300 hover:shadow-2xl ${isLargeRow ? "h-[250px] md:h-[400px]" : "h-[100px] md:h-[150px]"}`}
                src={getImageUrl(isLargeRow ? movie.poster_path : movie.backdrop_path)}
                alt={movie.name || movie.title}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-b-md">
                <div className="flex space-x-2 items-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      isInWatchlist(movie.id) ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
                    }}
                    className="bg-white/20 p-1 rounded-full hover:bg-white/40 border border-white/50"
                  >
                    {isInWatchlist(movie.id) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <p className="text-[10px] font-bold line-clamp-1">
                    {movie?.title || movie?.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showArrows && (
           <button 
           className="absolute right-0 z-40 bg-black/50 p-2 h-full opacity-0 group-hover:opacity-100 transition-opacity"
           onClick={() => scroll("right")}
         >
           <ChevronRight className="w-8 h-8" />
         </button>
        )}
      </div>
    </div>
  );
}

export default Row;

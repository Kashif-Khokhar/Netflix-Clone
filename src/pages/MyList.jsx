import React, { useState } from "react";
import Row from "../components/Row";
import TrailerModal from "../components/TrailerModal";
import InfoModal from "../components/InfoModal";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import axios from "../api/axios";

function MyList() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [infoMovie, setInfoMovie] = useState(null);
  const { watchlist } = useWatchlist();

  const handleTrailerClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const API_KEY = "8973d4ae24a0d9f057c7d1e8c9c049d5";
      try {
        const response = await axios.get(
          `/${movie.media_type || 'movie'}/${movie.id}/videos?api_key=${API_KEY}`
        );
        const trailer = response.data.results.find(
          (vid) => vid.type === "Trailer" || vid.site === "YouTube"
        );
        setTrailerUrl(trailer ? trailer.key : "");
      } catch (error) {
        console.log("Error fetching trailer:", error);
      }
    }
  };

  const handleInfoClick = (movie) => {
    setInfoMovie(movie);
  };

  return (
    <div className="myList pt-24 pb-20 px-12">
      <h1 className="text-3xl font-bold mb-8 text-white">My List</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
           {watchlist.map((movie) => (
             <div key={movie.id} className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
                <img 
                  onClick={() => handleInfoClick(movie)}
                  src={(movie.backdrop_path || movie.poster_path)?.startsWith("http") 
                    ? (movie.backdrop_path || movie.poster_path) 
                    : (movie.backdrop_path || movie.poster_path)
                      ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path || movie.poster_path}`
                      : "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=2069"} 
                  alt={movie.name || movie.title}
                  className="w-full h-auto rounded-md shadow-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md gap-4">
                   <button 
                    onClick={() => handleTrailerClick(movie)}
                    className="p-2 bg-white rounded-full hover:bg-gray-200"
                   >
                     <Play className="w-5 h-5 text-black fill-current" />
                   </button>
                   <button 
                    onClick={() => handleInfoClick(movie)}
                    className="p-2 border border-white rounded-full hover:bg-white/20"
                   >
                     <Info className="w-5 h-5 text-white" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <p className="text-[#e5e5e5] text-lg">You haven't added anything to your list yet.</p>
      )}

      <TrailerModal 
        trailerUrl={trailerUrl} 
        onClose={() => setTrailerUrl("")} 
      />

      <InfoModal 
        movie={infoMovie} 
        onClose={() => setInfoMovie(null)} 
        onPlay={(movie) => {
          setInfoMovie(null);
          handleTrailerClick(movie);
        }}
      />
    </div>
  );
}

export default MyList;

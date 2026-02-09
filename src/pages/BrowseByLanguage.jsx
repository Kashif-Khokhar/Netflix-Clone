import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import TrailerModal from "../components/TrailerModal";
import InfoModal from "../components/InfoModal";
import { Play, Info } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "zh", name: "Chinese" },
];

function BrowseByLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [content, setContent] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [infoMovie, setInfoMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const API_KEY = "8973d4ae24a0d9f057c7d1e8c9c049d5"; // Using the same key from requests.js
      try {
        const response = await axios.get(
          `/discover/movie?api_key=${API_KEY}&with_original_language=${selectedLanguage}&sort_by=popularity.desc`
        );
        setContent(response.data.results);
      } catch (error) {
        console.error("Error fetching language-based content:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedLanguage]);

  const handleClick = async (movie) => {
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
        console.error("Error fetching trailer:", error);
      }
    }
  };

  const handleInfoClick = (movie) => {
    setInfoMovie(movie);
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-12 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Browse by Languages</h1>
        <div className="flex items-center gap-4">
          <span className="text-[#808080] text-sm">Select Your Preferred Language</span>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-black border border-white/30 text-white px-4 py-1 rounded cursor-pointer hover:bg-white/10 transition-colors focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
        </div>
      ) : content.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {content.map((item) => (
            <div 
              key={item.id} 
              className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img 
                onClick={() => handleInfoClick(item)}
                src={(item.poster_path || item.backdrop_path)?.startsWith("http") 
                  ? (item.poster_path || item.backdrop_path) 
                  : (item.poster_path || item.backdrop_path) 
                    ? `https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path}`
                    : "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=2069"} 
                alt={item.title || item.name}
                className="w-full h-auto rounded shadow-lg object-cover aspect-[2/3]"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded text-xs">
                <div className="flex items-center gap-x-2 mb-2">
                   <button 
                    onClick={() => handleClick(item)}
                    className="p-1 bg-white rounded-full hover:bg-gray-200"
                   >
                     <Play className="w-4 h-4 text-black fill-current" />
                   </button>
                   <button 
                    onClick={() => handleInfoClick(item)}
                    className="p-1 border border-white rounded-full hover:bg-white/20 ml-auto"
                   >
                     <Info className="w-4 h-4 text-white" />
                   </button>
                </div>
                <p className="font-bold mb-1 truncate">{item.title || item.name}</p>
                <p className="text-[#46d369] font-semibold">{item.vote_average * 10}% Match</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#e5e5e5] text-lg text-center mt-20">No content found for this language.</p>
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
          handleClick(movie);
        }}
      />
    </div>
  );
}

export default BrowseByLanguage;

import React from "react";
import { X, Play, Plus, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function InfoModal({ movie, onClose, onPlay }) {
  if (!movie) return null;

  return (
    <AnimatePresence>
      {movie && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] bg-[#181818] p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Backdrop Header */}
            <div className="relative aspect-video w-full">
              <img 
                src={movie?.backdrop_path?.startsWith("http") 
                  ? movie.backdrop_path 
                  : (movie?.backdrop_path || movie?.poster_path) 
                    ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`
                    : "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=2069"
                } 
                alt={movie?.title || movie?.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 space-y-4 max-w-[80%]">
                <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                  {movie?.title || movie?.name || movie?.original_name}
                </h2>
                <div className="flex items-center gap-x-4">
                  <button 
                    onClick={() => onPlay(movie)}
                    className="flex items-center px-8 py-2 bg-white text-black font-bold rounded hover:bg-[#e6e6e6] transition"
                  >
                    <Play className="w-6 h-6 mr-2 fill-current" /> Play
                  </button>
                  <button className="p-2 border-2 border-white/50 rounded-full hover:border-white transition bg-black/40">
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                  <button className="p-2 border-2 border-white/50 rounded-full hover:border-white transition bg-black/40">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Details Content */}
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-x-3 text-sm font-semibold">
                  <span className="text-[#46d369]">
                    {isNaN(movie?.vote_average) ? (movie?.id % 20 + 80) : Math.round(movie?.vote_average * 10)}% Match
                  </span>
                  <span className="text-gray-400">
                    {movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0] || "2024"}
                  </span>
                  <span className="border border-white/40 px-1 text-[10px] rounded uppercase">HD</span>
                </div>
                <p className="text-white text-lg leading-relaxed">
                  {movie?.overview || "No description available for this title. Experience the magic and drama of this acclaimed story, exclusive to our platform."}
                </p>
              </div>

              <div className="text-sm space-y-4">
                <div>
                  <span className="text-gray-500">Vote Count: </span>
                  <span className="text-white">{movie?.vote_count || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Popularity: </span>
                  <span className="text-white">{movie?.popularity ? movie.popularity.toFixed(1) : "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Original Language: </span>
                  <span className="text-white uppercase">{movie?.original_language || "en"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InfoModal;

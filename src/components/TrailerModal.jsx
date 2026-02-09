import React from "react";
import YouTube from "react-youtube";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TrailerModal({ trailerUrl, onClose }) {
  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      controls: 1,
    },
  };

  return (
    <AnimatePresence>
      {trailerUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-5xl bg-[#141414] rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] bg-black/60 p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:text-black" />
            </button>
            <div className="aspect-video w-full">
               <YouTube videoId={trailerUrl} opts={opts} className="w-full h-full" />
            </div>
            <div className="p-6 bg-[#141414]">
               <h2 className="text-white text-2xl font-bold">Previewing Trailer</h2>
               <p className="text-gray-400 mt-2 text-sm italic">Note: Trailers are fetched from YouTube via TMDB API.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TrailerModal;

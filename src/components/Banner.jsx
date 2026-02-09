import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import { Play, Info } from "lucide-react";
import { sampleMovies } from "../api/sampleData";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      } catch {
        setMovie(sampleMovies[Math.floor(Math.random() * sampleMovies.length)]);
      }
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="relative text-white object-contain min-h-[500px] h-[95vh] md:h-[100vh]"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${movie?.backdrop_path?.startsWith("http") ? movie?.backdrop_path : `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative pt-[35vh] md:pt-[250px] ml-[30px] md:ml-[60px] pb-20 z-10 max-w-[90%] md:max-w-[45%]">
        <h1 className="text-4xl md:text-7xl font-black pb-6 drop-shadow-2xl leading-tight">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="flex space-x-4">
          <button className="flex items-center px-4 md:px-8 py-2 bg-white text-black font-extrabold rounded-sm hover:bg-[#e6e6e6] transition duration-300 transform active:scale-95">
            <Play className="w-5 h-5 mr-2 fill-current" /> Play
          </button>
          <button className="flex items-center px-4 md:px-8 py-2 bg-[rgba(109,109,110,0.7)] text-white font-extrabold rounded-sm hover:bg-[rgba(109,109,110,0.4)] transition duration-300 transform active:scale-95">
            <Info className="w-5 h-5 mr-2" /> More Info
          </button>
        </div>

        <h1 className="w-full leading-[1.3] pt-6 font-semibold text-sm md:text-lg drop-shadow-md">
          {truncate(movie?.overview, 200)}
        </h1>
      </div>

      <div className="absolute bottom-0 w-full h-[15vh] bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      <div className="absolute top-0 w-full h-[10vh] bg-gradient-to-b from-black/50 to-transparent" />
    </header>
  );
}

export default Banner;

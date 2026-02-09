import React, { useState } from "react";
import requests from "../api/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import TrailerModal from "../components/TrailerModal";
import InfoModal from "../components/InfoModal";
import axios from "../api/axios";

function Movies() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [infoMovie, setInfoMovie] = useState(null);

  const handleTrailerClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const API_KEY = "8973d4ae24a0d9f057c7d1e8c9c049d5";
      try {
        const response = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}`
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
    <div className="movies pb-20">
      <Banner fetchUrl={requests.fetchTopRated} onInfoClick={handleInfoClick} />
      <div className="mt-[-150px] relative z-20 space-y-8">
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} isLargeRow handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
      </div>

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

export default Movies;

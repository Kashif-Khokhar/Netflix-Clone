import React, { useState } from "react";
import requests from "../api/requests";
import Banner from "../components/Banner";
import Row from "../components/Row";
import TrailerModal from "../components/TrailerModal";
import InfoModal from "../components/InfoModal";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import axios from "../api/axios";

function Home() {
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
    <div className="home pb-20">
      <Banner fetchUrl={requests.fetchTrending} onInfoClick={handleInfoClick} />
      <div className="mt-[-150px] relative z-20 space-y-8">
        {watchlist.length > 0 && (
          <Row
            title="My List"
            initialMovies={watchlist}
            handleClick={handleTrailerClick}
            onInfoClick={handleInfoClick}
          />
        )}
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
          handleClick={handleTrailerClick}
          onInfoClick={handleInfoClick}
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} handleClick={handleTrailerClick} onInfoClick={handleInfoClick} />
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

export default Home;

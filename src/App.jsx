import React, { useState } from "react";
import Row from "./components/Row";
import requests from "./api/requests";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import TrailerModal from "./components/TrailerModal";
import { WatchlistProvider, useWatchlist } from "./context/WatchlistContext.jsx";
import axios from "./api/axios";

// Helper component to access context within the same file if needed, 
// but we'll wrap the content in a separate component to use useWatchlist.
function AppContent() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const { watchlist } = useWatchlist();

  const handleClick = async (movie) => {
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

  return (
    <div className="bg-[#111] min-h-screen font-sans">
      <Nav />
      <Banner />
      
      <div className="mt-[-150px] relative z-20 pb-20 space-y-8">
        {watchlist.length > 0 && (
          <Row
            title="My List"
            initialMovies={watchlist}
            handleClick={handleClick}
          />
        )}
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
          handleClick={handleClick}
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} handleClick={handleClick} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} handleClick={handleClick} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} handleClick={handleClick} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} handleClick={handleClick} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} handleClick={handleClick} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} handleClick={handleClick} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} handleClick={handleClick} />
      </div>

      <TrailerModal 
        trailerUrl={trailerUrl} 
        onClose={() => setTrailerUrl("")} 
      />
    </div>
  );
}

function App() {
  return (
    <WatchlistProvider>
      <AppContent />
    </WatchlistProvider>
  );
}

export default App;

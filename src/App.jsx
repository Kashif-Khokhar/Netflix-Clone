import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import NewPopular from "./pages/NewPopular";
import MyList from "./pages/MyList";
import BrowseByLanguage from "./pages/BrowseByLanguage";

function App() {
  return (
    <Router>
      <WatchlistProvider>
        <div className="bg-[#111] min-h-screen font-sans overflow-x-hidden">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/new-popular" element={<NewPopular />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/browse-by-languages" element={<BrowseByLanguage />} />
          </Routes>
        </div>
      </WatchlistProvider>
    </Router>
  );
}

export default App;

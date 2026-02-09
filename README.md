# 🎬 Netflix Clone - Premium Streaming Experience

A state-of-the-art Netflix Clone built with **React 19**, **Vite**, and **Tailwind CSS 4**. This project features a cinematic UI, dynamic content from TMDB, and glassmorphic design elements.

---

## ✨ Features

- **📺 Differentiated Banners**: Each page (Movies, TV Shows, Trending) features unique, high-quality featured content.
- **ℹ️ Movie Info Modal**: A premium, high-fidelity modal displaying detailed movie metadata, ratings, and descriptions.
- **🎞️ Content Rows**: Categorized movie reels including Trending, Originals, and Top Rated with smooth hover effects.
- **🎬 Trailer Playback**: Integrated YouTube player for instant movie previews.
- **🌐 Browse by Languages**: Discover global cinema by filtering content by original language.
- **➕ Personal Watchlist**: Save your favorite movies and shows to a persistent personal collection.
- **🛡️ Robust Image Recovery**: Automatic "bulletproof" image resolving with high-quality fallbacks for missing or broken assets.
- **📱 Responsive Design**: Fully optimized for a seamless experience on all devices.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucidreact.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Video Player**: [React YouTube](https://github.com/tjallingt/react-youtube)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- TMDB API Key (Optional, fallback sample data provided)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kashif-Khokhar/Netflix-Clone.git
   cd Netflix-Clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your TMDB API Key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/api/`: Axios configuration, TMDB requests, and custom sample data.
- `src/components/`: Reusable UI components (Banner, Nav, Row, InfoModal, TrailerModal).
- `src/pages/`: Page-level components (Home, Movies, TVShows, MyList, BrowseByLanguage).
- `src/context/`: State management for Watchlist.
- `src/index.css`: Global styles and Tailwind 4 theme configuration.

---

Built with ❤️ by [Kashif Khokhar](https://github.com/Kashif-Khokhar)

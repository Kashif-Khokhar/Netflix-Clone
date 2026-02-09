# 🎬 Netflix Clone - Premium Streaming Experience

A state-of-the-art Netflix Clone built with **React 19**, **Vite**, and **Tailwind CSS 4**. This project features a cinematic UI, dynamic content from TMDB, and glassmorphic design elements.

---

## ✨ Features

- **📺 Dynamic Banner**: Featured content with cinematic previews and metadata.
- **🎞️ Content Rows**: Categorized movie reels including Trending, Originals, and Top Rated.
- **🎬 Trailer Playback**: Interactive modal for watching movie trailers.
- **🌓 Modern Aesthetics**: Premium dark mode with slate-emerald accents and glassmorphism.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **🛰️ Real-time Data**: Integrated with TMDB API for up-to-date movie information.

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

- `src/api/`: Axios configuration and TMDB requests.
- `src/components/`: Reusable UI components (Banner, Nav, Row, TrailerModal).
- `src/context/`: State management for trailers and UI settings.
- `src/index.css`: Global styles and Tailwind 4 configuration.

---

Built with ❤️ by [Kashif Khokhar](https://github.com/Kashif-Khokhar)

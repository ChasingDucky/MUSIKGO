# MUSIKGO 🎵

A modern music streaming platform inspired by Spotify, built with React and Node.js.

## Features

- 🎨 **Material Design 3** - Modern UI with dynamic theming
- 🎨 **Monet Color System** - Dynamic color extraction from album artwork
- 🎵 **Music Player** - Full-featured audio player with playback controls
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔍 **Search & Discovery** - Find your favorite music easily
- 📝 **Playlists** - Create and manage custom playlists
- 🔐 **User Authentication** - Secure user accounts

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Material-UI (MUI) v6
- Material Design 3
- React Router
- Zustand (State Management)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- JWT Authentication
- Multer (File uploads)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd MUSIKGO
\`\`\`

2. Install dependencies
\`\`\`bash
npm run install:all
\`\`\`

3. Set up environment variables

Create `.env` files in both `client` and `server` directories (see `.env.example` files)

4. Start development servers
\`\`\`bash
npm run dev
\`\`\`

The client will run on `http://localhost:5173` and the server on `http://localhost:3000`

## Project Structure

\`\`\`
MUSIKGO/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── theme/
│   │   └── utils/
│   └── package.json
├── server/          # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── package.json
└── package.json     # Root package.json
\`\`\`

## License

MIT

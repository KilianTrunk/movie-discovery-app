# Movie Discovery App

A modern movie discovery application built with Next.js and The Movie Database (TMDB) API. Browse popular movies, search for specific titles, and explore detailed movie information.

## Tech Stack

- **Frontend**: Next.js 13+ (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library
- **API**: The Movie Database (TMDB)
- **Deployment**: Docker

## Getting Started

### Prerequisites
- Node.js 20+
- TMDB API Key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KilianTrunk/movie-discovery-app.git
   cd movie-discovery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your TMDB_API_KEY
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

### Docker Development

```bash
# Start development environment
docker-compose up

# Build and run
docker-compose up --build
```

## Available Scripts

```bash
npm run dev                # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint
npm test                   # Run Jest tests
npm run test:coverage      # Run tests with coverage
```

## Project Structure

```
├── app/                   # Next.js App Router pages
│   ├── api/               # API routes
│   ├── movie/[id]/        # Dynamic movie detail pages
│   └── page.tsx           # Home page
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # External service integrations
├── types/                 # TypeScript definitions
├── utils/                 # Utility functions
└── __tests__/             # Test files
```

## Features

- Browse popular movies from TMDB
- Search movies by title
- View detailed movie information
- Responsive design for all devices
- TypeScript for type safety
- Comprehensive test coverage

## Future Improvements

- **Global State Management**: Replace sessionStorage with Zustand for better state management
- **Infinite Scroll or Pagination**: Implement virtual scrolling for better UX with large movie lists
- **Advanced Search Filters**: Add genre, year, and rating filters to the search functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project was created as part of a coding challenge.

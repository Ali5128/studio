import type { Movie } from './types';
import { v4 as uuidv4 } from 'uuid';

// In-memory store for movies
let movies: Movie[] = [
  {
    id: '1',
    title: 'Cosmic Odyssey',
    description: 'A thrilling journey through space and time, where a team of explorers discovers the secrets of the universe.',
    year: 2023,
    externalLink: 'https://example.com/cosmic-odyssey',
    thumbnailUrl: 'https://picsum.photos/id/1015/500/750',
    metaTitle: 'Cosmic Odyssey (2023) - Sci-Fi Adventure Movie',
    metaDescription: 'Embark on a Cosmic Odyssey, a visually stunning sci-fi adventure. Watch the official trailer and find out more.'
  },
  {
    id: '2',
    title: 'Echoes of the Past',
    description: 'A detective haunted by his past must solve a case that connects to a forgotten memory.',
    year: 2021,
    externalLink: 'https://example.com/echoes-of-the-past',
    thumbnailUrl: 'https://picsum.photos/id/1025/500/750',
    metaTitle: 'Echoes of the Past - A Gripping Mystery Thriller',
    metaDescription: 'Unravel the mystery in Echoes of the Past. A detective confronts his demons to solve a chilling case. Now available to stream.'
  },
  {
    id: '3',
    title: 'The Last Stand',
    description: 'In a post-apocalyptic world, a small community fights for survival against a horde of mutants.',
    year: 2024,
    externalLink: 'https://example.com/the-last-stand',
    thumbnailUrl: 'https://picsum.photos/id/103/500/750',
    metaTitle: 'The Last Stand (2024) | Official Action Movie Site',
    metaDescription: 'Experience the fight for survival in The Last Stand. The latest action-packed movie of 2024. Watch now.'
  },
  {
    id: '4',
    title: 'Midnight Bloom',
    description: 'A romantic drama about two artists who find love and inspiration in the bustling city of Paris.',
    year: 2022,
    externalLink: 'https://example.com/midnight-bloom',
    thumbnailUrl: 'https://picsum.photos/id/1040/500/750',
    metaTitle: 'Midnight Bloom - A Parisian Love Story | Romance Movie',
    metaDescription: 'Fall in love with Midnight Bloom, a beautiful romantic drama set in the heart of Paris. Discover the story.'
  },
  {
    id: '5',
    title: 'Cybernetic Revolution',
    description: 'In a future dominated by AI, a lone hacker uncovers a conspiracy that could change humanity forever.',
    year: 2025,
    externalLink: 'https://example.com/cybernetic-revolution',
    thumbnailUrl: 'https://picsum.photos/id/107/500/750',
    metaTitle: 'Cybernetic Revolution: Sci-Fi Dystopian Film (2025)',
    metaDescription: 'The future is now. Dive into Cybernetic Revolution and question everything you know about AI and humanity.'
  }
];

// Data Access Functions
export async function getMovies(): Promise<Movie[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return movies;
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return movies.find(m => m.id === id);
}

export async function addMovie(movieData: Omit<Movie, 'id'>): Promise<Movie> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newMovie: Movie = {
    id: uuidv4(),
    ...movieData
  };
  movies.unshift(newMovie); // Add to the beginning of the array
  return newMovie;
}

export async function updateMovie(id: string, movieData: Partial<Omit<Movie, 'id'>>): Promise<Movie | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const movieIndex = movies.findIndex(m => m.id === id);
  if (movieIndex !== -1) {
    movies[movieIndex] = { ...movies[movieIndex], ...movieData };
    return movies[movieIndex];
  }
  return null;
}

export async function deleteMovie(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const initialLength = movies.length;
  movies = movies.filter(m => m.id !== id);
  return movies.length < initialLength;
}

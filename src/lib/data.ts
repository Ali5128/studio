import type { Movie, MovieData } from './types';
import { v4 as uuidv4 } from 'uuid';

// In-memory store for movies
let movies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    year: 1994,
    externalLink: 'https://example.com/shawshank-redemption',
    thumbnailUrl: 'https://picsum.photos/500/750?random=1',
    metaTitle: 'The Shawshank Redemption (1994)',
    metaDescription: 'An epic tale of hope and friendship inside a brutal prison.',
  },
  {
    id: '2',
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    year: 1972,
    externalLink: 'https://example.com/the-godfather',
    thumbnailUrl: 'https://picsum.photos/500/750?random=2',
    metaTitle: 'The Godfather (1972) - A Cinematic Masterpiece',
    metaDescription: 'Witness the Corleone family\'s rise to power in this iconic mafia film.',
  },
  {
    id: '3',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    year: 2008,
    externalLink: 'https://example.com/the-dark-knight',
    thumbnailUrl: 'https://picsum.photos/500/750?random=3',
    metaTitle: 'The Dark Knight (2008) - Why So Serious?',
    metaDescription: 'Heath Ledger\'s legendary performance as the Joker redefined superhero movies.',
  },
];

export async function getMovies(): Promise<Movie[]> {
  // Simulate async operation
  return Promise.resolve(movies);
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  // Simulate async operation
  return Promise.resolve(movies.find(movie => movie.id === id));
}

export async function addMovie(movieData: MovieData): Promise<Movie> {
  const newMovie: Movie = {
    id: uuidv4(),
    ...movieData,
  };
  movies.push(newMovie);
  // Simulate async operation
  return Promise.resolve(newMovie);
}

export async function updateMovie(id: string, movieData: Partial<MovieData>): Promise<void> {
  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex !== -1) {
    movies[movieIndex] = { ...movies[movieIndex], ...movieData };
  }
  // Simulate async operation
  return Promise.resolve();
}

export async function deleteMovie(id: string): Promise<void> {
  movies = movies.filter(movie => movie.id !== id);
  // Simulate async operation
  return Promise.resolve();
}

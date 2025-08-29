import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { Movie, MovieData } from './types';

const MOVIES_COLLECTION = 'movies';

export async function getMovies(): Promise<Movie[]> {
  const moviesCollection = collection(db, MOVIES_COLLECTION);
  const moviesSnapshot = await getDocs(moviesCollection);
  return moviesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Movie));
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  const docRef = doc(db, MOVIES_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Movie;
  } else {
    return undefined;
  }
}

export async function addMovie(movieData: MovieData): Promise<Movie> {
  const docRef = await addDoc(collection(db, MOVIES_COLLECTION), movieData);
  return { id: docRef.id, ...movieData };
}

export async function updateMovie(id: string, movieData: Partial<MovieData>): Promise<Movie | null> {
  const docRef = doc(db, MOVIES_COLLECTION, id);
  await updateDoc(docRef, movieData);
  const updatedDoc = await getDoc(docRef);
  return updatedDoc.exists() ? { id: updatedDoc.id, ...updatedDoc.data() } as Movie : null;
}

export async function deleteMovie(id: string): Promise<boolean> {
  const docRef = doc(db, MOVIES_COLLECTION, id);
  await deleteDoc(docRef);
  return true; // Assume success, or add error handling
}

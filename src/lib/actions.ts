'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from './auth';
import { FAKE_ADMIN_USER, FAKE_ADMIN_PASSWORD } from './constants';
import { addMovie as dbAddMovie, updateMovie as dbUpdateMovie, deleteMovie as dbDeleteMovie } from './data';
import { generateSeoMetadata } from '@/ai/flows/generate-seo-metadata';
import type { Movie } from './types';

// --- Auth Actions ---

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        type: 'error',
        message: 'Invalid form data.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { username, password } = validatedFields.data;

    if (username === FAKE_ADMIN_USER && password === FAKE_ADMIN_PASSWORD) {
      await createSession();
    } else {
      return { type: 'error', message: 'Invalid username or password.' };
    }
  } catch (error) {
    return { type: 'error', message: 'An unexpected error occurred.' };
  }
  redirect('/admin/dashboard');
}

export async function logoutAction() {
  await deleteSession();
}

// --- Movie Actions ---

const movieSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  year: z.coerce.number().min(1888, 'Year must be after 1888').max(new Date().getFullYear() + 5, 'Year is too far in the future'),
  externalLink: z.string().url('Must be a valid URL'),
  thumbnailUrl: z.string().url('Must be a valid URL'),
});

type MovieFormState = {
  type: 'success' | 'error';
  message: string;
  errors?: Record<string, string[] | undefined>;
} | null;

export async function saveMovieAction(prevState: MovieFormState, formData: FormData): Promise<MovieFormState> {
  const validatedFields = movieSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      type: 'error',
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { id, ...movieData } = validatedFields.data;

  try {
    const seoMetadata = await generateSeoMetadata({
      title: movieData.title,
      description: movieData.description,
    });
    
    const moviePayload = { ...movieData, ...seoMetadata };

    if (id) {
      await dbUpdateMovie(id, moviePayload);
    } else {
      await dbAddMovie(moviePayload as Omit<Movie, 'id'>);
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    revalidatePath('/sitemap.xml');
    
    return { type: 'success', message: `Movie has been ${id ? 'updated' : 'saved'} successfully!` };

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { type: 'error', message: `Failed to save movie: ${errorMessage}` };
  }
}

export async function deleteMovieAction(id: string) {
    if (!id) {
        return { type: 'error', message: 'Movie ID is required.' };
    }
    try {
        await dbDeleteMovie(id);
        revalidatePath('/');
        revalidatePath('/admin/dashboard');
        revalidatePath('/sitemap.xml');
        return { type: 'success', message: 'Movie deleted successfully.' };
    } catch (error) {
        return { type: 'error', message: 'Failed to delete movie.' };
    }
}

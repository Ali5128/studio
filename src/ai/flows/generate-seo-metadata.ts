'use server';

/**
 * @fileOverview Flow for generating SEO metadata for movies.
 *
 * - generateSeoMetadata - A function that generates SEO metadata for a movie.
 * - GenerateSeoMetadataInput - The input type for the generateSeoMetadata function.
 * - GenerateSeoMetadataOutput - The return type for the generateSeoMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetadataInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  description: z.string().describe('The description of the movie.'),
  viewingHistory: z
    .string()
    .optional()
    .describe(
      "The user's viewing history, as a string.  Can be used to tailor the description."
    ),
  generalPopularity: z
    .string()
    .optional()
    .describe('A string describing the general popularity of the movie.'),
});
export type GenerateSeoMetadataInput = z.infer<typeof GenerateSeoMetadataInputSchema>;

const GenerateSeoMetadataOutputSchema = z.object({
  metaTitle: z.string().describe('The SEO-friendly meta title for the movie.'),
  metaDescription: z
    .string()
    .describe('The SEO-friendly meta description for the movie.'),
});
export type GenerateSeoMetadataOutput = z.infer<typeof GenerateSeoMetadataOutputSchema>;

export async function generateSeoMetadata(
  input: GenerateSeoMetadataInput
): Promise<GenerateSeoMetadataOutput> {
  return generateSeoMetadataFlow(input);
}

const generateSeoMetadataPrompt = ai.definePrompt({
  name: 'generateSeoMetadataPrompt',
  input: {schema: GenerateSeoMetadataInputSchema},
  output: {schema: GenerateSeoMetadataOutputSchema},
  prompt: `You are an SEO expert specializing in creating compelling meta titles and descriptions.

  Given the following movie information, create an SEO-friendly meta title and meta description.

  Movie Title: {{{title}}}
  Movie Description: {{{description}}}
  User Viewing History: {{{viewingHistory}}}
  General Popularity: {{{generalPopularity}}}

  Ensure the meta title is concise (under 60 characters) and includes relevant keywords.
  The meta description should be engaging (under 160 characters) and accurately reflect the movie's content.
  Tailor the meta description to the user's viewing history and the movie's general popularity if provided.

  Output the meta title and meta description in a JSON format.
  `,
});

const generateSeoMetadataFlow = ai.defineFlow(
  {
    name: 'generateSeoMetadataFlow',
    inputSchema: GenerateSeoMetadataInputSchema,
    outputSchema: GenerateSeoMetadataOutputSchema,
  },
  async input => {
    const {output} = await generateSeoMetadataPrompt(input);
    return output!;
  }
);

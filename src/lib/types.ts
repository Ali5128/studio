export type Movie = {
  id: string;
  title: string;
  description: string;
  year: number;
  externalLink: string;
  thumbnailUrl: string;
  metaTitle: string;
  metaDescription: string;
};

export type MovieData = Omit<Movie, 'id'>;

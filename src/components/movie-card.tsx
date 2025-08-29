'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Movie } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const PLACEHOLDER_IMAGE = 'https://picsum.photos/500/750';

export function MovieCard({ movie }: { movie: Movie }) {
  const [imgSrc, setImgSrc] = useState(movie.thumbnailUrl);
  const [isLinkValid, setIsLinkValid] = useState(false);

  useEffect(() => {
    try {
      new URL(movie.externalLink);
      setIsLinkValid(true);
    } catch {
      setIsLinkValid(false);
    }
  }, [movie.externalLink]);

  const CardContentWrapper = ({ children }: { children: React.ReactNode }) =>
    isLinkValid ? (
      <a href={movie.externalLink} target="_blank" rel="noopener noreferrer" className="block group h-full">
        {children}
      </a>
    ) : (
      <div className="group h-full">{children}</div>
    );

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-2">
      <CardContentWrapper>
        <div className="h-full flex flex-col">
          <CardHeader className="p-0 relative">
            <div className="aspect-[2/3] w-full">
              <Image
                src={imgSrc}
                alt={`Thumbnail for ${movie.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
                data-ai-hint="movie poster"
              />
              {!isLinkValid && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                   <Badge variant="destructive">Temporarily Unavailable</Badge>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col">
            <CardTitle className="font-headline text-lg mb-2 group-hover:text-primary transition-colors">
              {movie.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
              {movie.description}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>{movie.year}</span>
            </div>
          </CardFooter>
        </div>
      </CardContentWrapper>
    </Card>
  );
}

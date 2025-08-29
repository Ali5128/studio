'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormState, useFormStatus } from 'react-dom';
import { saveMovieAction } from '@/lib/actions';
import type { Movie } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const movieSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  year: z.coerce.number().min(1888, 'Year must be after 1888').max(new Date().getFullYear() + 5),
  externalLink: z.string().url('Must be a valid URL'),
  thumbnailUrl: z.string().url('Must be a valid URL'),
});

type MovieFormData = z.infer<typeof movieSchema>;

interface MovieFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  movie: Movie | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? 'Updating...' : 'Saving...') : (isEditing ? 'Update Movie' : 'Save Movie')}
    </Button>
  );
}

export function MovieForm({ isOpen, setIsOpen, movie }: MovieFormProps) {
  const isEditing = !!movie;
  const [formState, formAction] = useFormState(saveMovieAction, null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: movie || { year: new Date().getFullYear() },
  });

  React.useEffect(() => {
    if (formState?.type === 'success') {
      toast({
        title: 'Success!',
        description: formState.message,
      });
      setIsOpen(false);
    } else if (formState?.type === 'error') {
      toast({
        title: 'Error!',
        description: formState.message,
        variant: 'destructive',
      });
    }
  }, [formState, setIsOpen, toast]);

  React.useEffect(() => {
    if (isOpen) {
      reset(movie || { year: new Date().getFullYear(), title: '', description: '', externalLink: '', thumbnailUrl: '' });
    }
  }, [isOpen, movie, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90vw] max-w-[625px] rounded-lg">
        <form action={formAction}>
          {isEditing && <input type="hidden" {...register('id')} value={movie.id} />}
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{isEditing ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
            <DialogDescription>
              {isEditing ? `Editing "${movie.title}".` : 'Fill in the details for the new movie.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" {...register('year')} />
                {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
              </div>
               <div className="grid gap-2">
                <Label htmlFor="externalLink">External Link</Label>
                <Input id="externalLink" {...register('externalLink')} />
                {errors.externalLink && <p className="text-sm text-destructive">{errors.externalLink.message}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input id="thumbnailUrl" {...register('thumbnailUrl')} />
              {errors.thumbnailUrl && <p className="text-sm text-destructive">{errors.thumbnailUrl.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} type="button">Cancel</Button>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

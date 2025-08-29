'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Film, LogIn } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Signing In...' : 'Sign In'}
      <LogIn className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Film className="w-12 h-12 text-primary mx-auto mb-2" />
          <h1 className="text-4xl font-headline font-bold">FreeMovies Admin</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="admin"
                  required
                  defaultValue="admin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                  defaultValue="password"
                />
              </div>
              {state?.type === 'error' && (
                <Alert variant="destructive">
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

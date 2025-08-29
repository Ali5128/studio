'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FAKE_COOKIE_NAME, FAKE_ADMIN_USER, FAKE_ADMIN_PASSWORD } from './constants';


export async function getSession() {
  return cookies().get(FAKE_COOKIE_NAME);
}

export async function createSession() {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  cookies().set(FAKE_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    path: '/',
  });
}

export async function deleteSession() {
  cookies().set(FAKE_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
  redirect('/admin/login');
}

'use server';

import { auth } from '@/firebase/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  try {
    const decodedIdToken = await auth.verifyIdToken(idToken);

    if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn,
      });
      cookies().set('session', sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return { success: true };
    }
    return { success: false, error: 'Recent sign-in required.' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create session.' };
  }
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
  redirect('/');
}

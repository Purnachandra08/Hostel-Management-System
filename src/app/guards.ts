import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth';

const redirectLogin = () => inject(Router).createUrlTree(['/login']);

export const studentGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isLoggedIn() && auth.getRole() === 'STUDENT' ? true : router.createUrlTree(['/login']);
};

export const wardenGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isLoggedIn() && auth.getRole() === 'WARDEN' ? true : router.createUrlTree(['/login']);
};

export const adminGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isLoggedIn() && auth.getRole() === 'ADMIN' ? true : router.createUrlTree(['/login']);
};

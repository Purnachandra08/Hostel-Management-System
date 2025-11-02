import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth';

// 🧑‍🎓 Student Guard
export const studentGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getToken();
  const role = (auth.getRole() ?? '').toUpperCase(); // 👈 Prevent undefined

  if (token && ['STUDENT', 'ROLE_USER', 'USER'].includes(role)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// 🧑‍🏫 Warden Guard
export const wardenGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getToken();
  const role = (auth.getRole() ?? '').toUpperCase();

  if (token && ['WARDEN', 'ROLE_MANAGER', 'MANAGER'].includes(role)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// 🧑‍💼 Admin Guard
export const adminGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getToken();
  const role = (auth.getRole() ?? '').toUpperCase();

  if (token && ['ADMIN', 'ROLE_ADMIN'].includes(role)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

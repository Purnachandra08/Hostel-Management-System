import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  private tokenKey = 'authToken';
  private roleKey = 'authRole';

  // For mock/demo only — in real app call backend
  loginMock(role: 'STUDENT' | 'WARDEN' | 'ADMIN') {
    const token = btoa(JSON.stringify({ role, exp: Date.now() + 3600 * 1000 }));
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
  }

  registerMock(role: 'STUDENT' | 'WARDEN' | 'ADMIN') {
    // for mock demo, registration simply logs in
    this.loginMock(role);
  }

  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  storeRole(role: 'STUDENT' | 'WARDEN' | 'ADMIN') {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): 'STUDENT' | 'WARDEN' | 'ADMIN' | null {
    const r = localStorage.getItem(this.roleKey);
    return (r as any) || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }
}

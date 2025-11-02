import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private baseUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';
  private roleKey = 'authRole';
  private usernameKey = 'authUsername';
  private userKey = 'user'; // ✅ to store full user data (with id)

  constructor(private http: HttpClient) {}

  // 🔹 LOGIN
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        console.log('✅ Login Response:', res);

        // ✅ Flexible backend handling
        const token = res.token || res.jwtToken;
        const role = (res.role || res.user?.role || '').toUpperCase();
        const uname = res.username || res.user?.username || username;
        const userId = res.id || res.user?.id; // ✅ capture user ID

        if (token && role) {
          this.storeToken(token);
          this.storeRole(role);
          this.storeUsername(uname);
          console.log('✅ Stored Token & Role:', role);
        } else {
          console.warn('⚠️ Missing token or role in response:', res);
        }

        // ✅ Store full user object (used by leave apply etc.)
        if (userId) {
          const userData = { id: userId, username: uname, role };
          localStorage.setItem(this.userKey, JSON.stringify(userData));
          console.log('✅ Stored user:', userData);
        } else {
          console.warn('⚠️ No userId found in response:', res);
        }
      })
    );
  }

  // 🔹 REGISTER
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // 🔹 TOKEN HANDLERS
  storeToken(token: string) { localStorage.setItem(this.tokenKey, token); }
  getToken() { return localStorage.getItem(this.tokenKey); }

  storeRole(role: string) { localStorage.setItem(this.roleKey, role.toUpperCase()); }
  getRole() { return localStorage.getItem(this.roleKey); }

  storeUsername(username: string) { localStorage.setItem(this.usernameKey, username); }
  getUsername() { return localStorage.getItem(this.usernameKey); }

  getUser() {
    return JSON.parse(localStorage.getItem(this.userKey) || '{}');
  }

  // 🔹 LOGOUT
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.userKey);
  }

  // 🔹 CHECK LOGIN
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

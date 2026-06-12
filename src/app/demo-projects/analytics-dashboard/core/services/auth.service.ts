import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { StorageService } from './storage.service';

export interface AdUser {
  email: string;
  name: string;
  role: 'admin' | 'viewer';
}

const DEMO_USERS = [
  { email: 'admin@demo.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { email: 'viewer@demo.com', password: 'viewer123', name: 'Viewer User', role: 'viewer' as const },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  login(email: string, password: string): Observable<AdUser> {
    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      return throwError(() => new Error('Invalid credentials'));
    }
    const token = btoa(`${user.email}:${Date.now()}`);
    const adUser: AdUser = { email: user.email, name: user.name, role: user.role };
    this.storage.set('ad_auth_token', token);
    this.storage.set('ad_auth_user', JSON.stringify(adUser));
    return of(adUser);
  }

  logout(): void {
    this.storage.remove('ad_auth_token');
    this.storage.remove('ad_auth_user');
  }

  isAuthenticated(): boolean {
    return !!this.storage.get('ad_auth_token');
  }

  getCurrentUser(): AdUser | null {
    const raw = this.storage.get('ad_auth_user');
    return raw ? (JSON.parse(raw) as AdUser) : null;
  }

  getToken(): string | null {
    return this.storage.get('ad_auth_token');
  }
}

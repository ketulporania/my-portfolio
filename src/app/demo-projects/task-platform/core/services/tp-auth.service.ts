export interface TpUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member' | 'viewer';
  tenantId: string;
}

export interface TpSession {
  user: TpUser;
  token: string;
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { TpStorageService } from './tp-storage.service';

@Injectable({ providedIn: 'root' })
export class TpAuthService {
  private http = inject(HttpClient);
  private storage = inject(TpStorageService);

  login(email: string, password: string): Observable<TpSession> {
    return this.http.get<TpUser[]>('/data/tp-users.json').pipe(
      map((users) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        const session: TpSession = { user, token: btoa(`${user.id}:${Date.now()}`) };
        this.storage.set('tp_auth_session', JSON.stringify(session));
        return session;
      })
    );
  }

  logout(): void {
    this.storage.remove('tp_auth_session');
  }

  getSession(): TpSession | null {
    const raw = this.storage.get('tp_auth_session');
    return raw ? (JSON.parse(raw) as TpSession) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  getCurrentUser(): TpUser | null {
    return this.getSession()?.user ?? null;
  }
}

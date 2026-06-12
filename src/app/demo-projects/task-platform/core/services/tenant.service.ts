export interface Tenant {
  id: string;
  name: string;
  primaryColor: string;
  plan: string;
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TpStorageService } from './tp-storage.service';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private http = inject(HttpClient);
  private storage = inject(TpStorageService);
  private currentTenant$ = new BehaviorSubject<Tenant | null>(null);

  loadTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>('/data/tp-tenants.json');
  }

  setTenant(tenant: Tenant): void {
    this.storage.set('tp_current_tenant', JSON.stringify(tenant));
    this.currentTenant$.next(tenant);
    document.documentElement.style.setProperty('--tp-primary', tenant.primaryColor);
  }

  getTenant(): Tenant | null {
    if (this.currentTenant$.value) return this.currentTenant$.value;
    const raw = this.storage.get('tp_current_tenant');
    if (raw) {
      const tenant = JSON.parse(raw) as Tenant;
      this.currentTenant$.next(tenant);
      document.documentElement.style.setProperty('--tp-primary', tenant.primaryColor);
      return tenant;
    }
    return null;
  }

  tenantChanges$ = this.currentTenant$.asObservable();
}

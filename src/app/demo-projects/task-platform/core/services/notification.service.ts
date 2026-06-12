import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  private idCounter = 0;
  private lastMessage = '';
  private lastMessageAt = 0;

  readonly messages$ = this.toasts$.asObservable();

  show(message: string, type: Toast['type'] = 'info'): void {
    const now = Date.now();
    if (message === this.lastMessage && now - this.lastMessageAt < 1000) return;
    this.lastMessage = message;
    this.lastMessageAt = now;

    const toast: Toast = { id: ++this.idCounter, message, type };
    this.toasts$.next([...this.toasts$.value, toast]);
    setTimeout(() => this.dismiss(toast.id), 4000);
  }

  dismiss(id: number): void {
    this.toasts$.next(this.toasts$.value.filter((t) => t.id !== id));
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tpTimeAgo', standalone: true })
export class TpTimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  }
}

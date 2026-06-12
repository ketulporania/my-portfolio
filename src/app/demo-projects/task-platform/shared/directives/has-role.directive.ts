import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectTpRole } from '../../store/auth/tp-auth.selectors';

@Directive({ selector: '[tpHasRole]', standalone: true })
export class HasRoleDirective {
  private tpl = inject(TemplateRef<unknown>);
  private vcr = inject(ViewContainerRef);
  private store = inject(Store);
  private role = toSignal(this.store.select(selectTpRole), { initialValue: undefined });

  @Input() set tpHasRole(roles: string[]) {
    this.updateView(roles);
  }

  private allowedRoles: string[] = [];

  constructor() {
    effect(() => {
      this.updateView(this.allowedRoles);
    });
  }

  private updateView(roles: string[]): void {
    this.allowedRoles = roles;
    this.vcr.clear();
    const role = this.role();
    if (role && roles.includes(role)) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}

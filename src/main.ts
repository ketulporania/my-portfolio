import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => {
  // In production, consider sending this to a logging service (e.g. Sentry)
  console.error('Application failed to bootstrap:', err);
});

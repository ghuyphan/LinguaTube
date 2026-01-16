import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withPreloading, PreloadAllModules, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { isDevMode, ErrorHandler } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { cacheInterceptor, timeoutInterceptor } from './app/interceptors';
import { GlobalErrorHandler } from './app/core/services/error-handler.service';

if (!isDevMode()) {
  console.log = () => { };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideAnimations(),
    provideHttpClient(withInterceptors([timeoutInterceptor, cacheInterceptor])),
    provideRouter(routes, withPreloading(PreloadAllModules), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}).catch(err => console.error(err));


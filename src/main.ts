import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { isDevMode, ErrorHandler } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { authInterceptor, cacheInterceptor, timeoutInterceptor } from './app/interceptors';
import { GlobalErrorHandler } from './app/core/services/error-handler.service';
import { IdlePreloadStrategy } from './app/core/strategies/idle-preload.strategy';

if (!isDevMode()) {
  console.log = () => { };
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(withInterceptors([authInterceptor, timeoutInterceptor, cacheInterceptor])),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled', anchorScrolling: 'enabled' }),
      withPreloading(IdlePreloadStrategy)
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:5000'
    })
  ]
}).catch(err => console.error(err));


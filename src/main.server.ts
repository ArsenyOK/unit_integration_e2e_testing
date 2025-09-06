import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import 'zone.js'

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { mockBackendInterceptor } from './app/core/mock/mock-backend.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                        
    provideHttpClient(withInterceptors([mockBackendInterceptor])),
  ],
}).catch(err => console.error(err));

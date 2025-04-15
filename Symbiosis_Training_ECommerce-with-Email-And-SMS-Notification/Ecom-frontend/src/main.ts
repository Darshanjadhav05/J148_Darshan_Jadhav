import '@angular/localize/init'
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/_auth/auth.interceptor'; // ✅ Correct Import

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])), // ✅ Register the new interceptor
    provideRouter(routes),
  ],
}).catch(err => console.error(err));

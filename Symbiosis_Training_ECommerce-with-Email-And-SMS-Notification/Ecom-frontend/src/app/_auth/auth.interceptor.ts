import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);

  // Check if No-Auth is set
  if (req.headers.get('No-Auth') === 'True') {
    console.log('[Interceptor] Skipping auth for:', req.url);
    return next(req);
  }

  const token = userAuthService.getToken();

  // Add Authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('[Interceptor] Attaching token for:', req.url);
  } else {
    console.warn('[Interceptor] No token found for:', req.url);
  }

  // Continue with the request and handle errors
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error(`[Interceptor] Error for ${req.url}:`, err);

      if (err.status === 401) {
        console.warn('[Interceptor] Unauthorized, redirecting to login.');
        router.navigate(['/login']);
      } else if (err.status === 403) {
        console.warn('[Interceptor] Forbidden, redirecting.');
        router.navigate(['/forbidden']);
      }

      return throwError(() => new Error('Something went wrong'));
    })
  );
};

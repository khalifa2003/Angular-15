import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser = this.authService.currentUserValue;
    if (this.authService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
    }
    return next.handle(request);
  }
}

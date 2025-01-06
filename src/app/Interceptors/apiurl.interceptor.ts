import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiurlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith('http') && !request.url.startsWith('https')) {
      const apiReq = request.clone({
        url: `${environment.apiUrl}${request.url}`,
      });
      return next.handle(apiReq);
    }
    return next.handle(request);
  }
}

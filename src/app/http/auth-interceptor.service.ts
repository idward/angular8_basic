import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   return this.authService.userEmitter.pipe(
      take(1),
      exhaustMap(user => {
        console.log(user);
        if (!user) {
          return next.handle(req);
        } else {
          const updatedReq = req.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(updatedReq);
        }
      })
    );
  }
}

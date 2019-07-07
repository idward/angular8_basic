import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';

import { AppState } from './../store/index';
import { AuthState } from './../store/reducers/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //  return this.authService.userEmitter.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map((responseData: AuthState) => responseData.user),
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

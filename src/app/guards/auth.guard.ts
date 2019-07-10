import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, take, takeUntil, mapTo } from 'rxjs/operators';

import { AppState } from './../store/index';
import { AuthState } from './../store/reducers/auth.reducer';

import { AuthService } from '../services/auth.service';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return this.authService.userEmitter.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map((responseData: AuthState) => responseData.user),
      map((user: User) => {
        console.log(user);
        if (!!user === false) {
          if (state.url === '/auth') {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        } else {
          if (state.url === '/auth') {
            return this.router.createUrlTree(['/recipes']);
          }
          return true;
        }
      })
      // tap((isAuth: boolean) => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}

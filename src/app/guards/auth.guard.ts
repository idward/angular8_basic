import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take, takeUntil } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.userEmitter.pipe(
      take(1),
      takeUntil(this.authService.userDestroy),
      map((user: User) => {
        console.log(user);
        if (!!user === false) {
          if (route.routeConfig.path === 'auth') {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        } else {
          if (route.routeConfig.path === 'auth') {
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

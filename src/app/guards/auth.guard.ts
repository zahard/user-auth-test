import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isUserLoggedin } from '@store/selectors/user.selector';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isUserLoggedin).pipe(
      take(1),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['']);
        }
      })
    );
  }
}

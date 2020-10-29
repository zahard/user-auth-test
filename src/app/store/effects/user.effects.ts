import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { UserSignInType } from 'src/app/models/user.model';
import * as UserActions from '../actions/user.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable()
export class UserEffects {

  googleSignIn$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.googleSignIn),
    exhaustMap(() =>
      this.authService.googleSignIn().pipe(
        map(profile => UserActions.loginSuccess({profile, signInType: UserSignInType.Google})),
        catchError(() => of(UserActions.loginFailure()))
      )
    )
  ));

  emailSignIn$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.emailSignIn),
    exhaustMap(({email, password}) =>
      this.authService.emailSignIn(email, password).pipe(
        map(profile => UserActions.loginSuccess({profile, signInType: UserSignInType.Email})),
        catchError(() => of(UserActions.loginFailure())),
      )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginSuccess),
    tap(() => {
      this.router.navigate(['user-details']);
    })
  ), { dispatch: false });


  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    exhaustMap(() =>
      this.authService.logout().pipe(
        map(() => UserActions.logoutSuccess()),
      )
    )
  ));

  logoutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logoutSuccess),
    tap(() => {
      this.router.navigate(['']);
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}

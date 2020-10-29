import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loaderOff, loaderOn } from '@store/actions/loader.actions';
import { selectUserState } from '@store/selectors/user.selector';
import { from, Observable } from 'rxjs';
import { delay, switchMap, take, tap } from 'rxjs/operators';
import { UserProfile, UserSignInType } from '../models/user.model';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class AuthService {
  constructor(private store: Store, private googleAuth: GoogleAuthService) {}

  googleSignIn() {
    return from(this.googleAuth.signIn());
  }

  emailSignIn(email: string, password: string): Observable<UserProfile> {
    // Fake Email signin procedure
    this.store.dispatch(loaderOn());
    const profile = {
      email: 'john.doe@fastmail.com',
      firstName: 'John',
      lastName: 'Doe',
      image: './assets/img/avatar.png',
      name: 'John Doe',
    };
    return from([profile]).pipe(
      delay(1000),
      tap(() => this.store.dispatch(loaderOff()))
    );
  }

  logout(): Observable<boolean> {
    return this.store.select(selectUserState).pipe(
      take(1),
      switchMap(user => {
        if (user.signInType === UserSignInType.Google) {
          return from(this.googleAuth.signOut());
        } else {
          return from([true]);
        }
      })
    );
  }
}

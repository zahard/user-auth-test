import { createAction, props } from '@ngrx/store';
import { UserProfile } from 'src/app/models/user.model';

export const googleSignIn = createAction('[User] Google SingIn');
export const emailSignIn = createAction(
  '[User] Email SingIn',
  props<{email: string, password: string}>()
);

export const loginFailure = createAction('[User] Login failure');
export const loginSuccess = createAction(
  '[User] Login success',
  props<{profile: UserProfile, signInType: 'email' | 'google'}>()
);

export const logout = createAction('[User] Logout');
export const logoutSuccess = createAction('[User] Logout Success');

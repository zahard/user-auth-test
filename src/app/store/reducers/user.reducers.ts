import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as UserActions from '../actions/user.actions';

export const initialState: User = {
  isSignedIn: false,
  signInType: null,
  profile: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, {profile, signInType}) => {
    return {
      ...state,
      isSignedIn: true,
      signInType,
      profile
    };
  }),

  on(UserActions.logoutSuccess, (state) => {
    return {
      ...state,
      isSignedIn: false,
      signInType: null,
      profile: null
    };
  }),
);

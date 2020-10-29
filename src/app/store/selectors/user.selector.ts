import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/state/app.state';
import { User } from 'src/app/models/user.model';

export const selectUserState = createFeatureSelector<User>('user');
export const selectUser = (state: AppState) => state.user;

export const isUserLoggedin = createSelector(
  selectUser,
  (user: User) => user.isSignedIn
);

export const getUserProfile = createSelector(
  selectUser,
  (user: User) => user.profile
);

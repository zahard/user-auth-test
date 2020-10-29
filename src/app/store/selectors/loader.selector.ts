import { createSelector } from '@ngrx/store';
import { AppState } from '@store/state/app.state';

export const selectFeature = (state: AppState) => state.loader;
export const loaderSelector = createSelector(
  selectFeature,
  (state: boolean) => state
);

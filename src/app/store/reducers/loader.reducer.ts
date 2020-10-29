import { createReducer, on } from '@ngrx/store';
import { loaderOff, loaderOn } from '@store/actions/loader.actions';

const initialState = false;
export const loaderReducer = createReducer(
  initialState,
  on(loaderOn, () => true),
  on(loaderOff, () => false),
);

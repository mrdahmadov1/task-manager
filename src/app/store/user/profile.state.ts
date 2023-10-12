import { createSelector } from '@ngrx/store';

// Profile State Selector
export const selectProfileState = (state: any) => state.profile;

// User Data Selector
export const selectUserData = createSelector(
  selectProfileState,
  (state) => state.userData
);

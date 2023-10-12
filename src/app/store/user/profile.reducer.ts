import { createReducer, on } from '@ngrx/store';
import { SetUserData } from './profile.actions';

export const initialState = {
  userData: null,
};

export const profileReducer = createReducer(
  initialState,
  on(SetUserData, (state, { userData }) => {
    return { ...state, userData };
  })
);

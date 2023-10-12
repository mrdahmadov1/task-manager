import { createAction, props } from '@ngrx/store';

export const SetUserData = createAction(
  '[Profile] Set User Data',
  props<{ userData: any }>()
);

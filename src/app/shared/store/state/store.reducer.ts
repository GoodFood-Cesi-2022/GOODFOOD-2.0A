import { ActionReducerMap } from '@ngrx/store';
import { State } from './store.state';
import * as UserReducer from './user/user.reducer';

/**
 * @ActionReducerMap Map of all the reducers in this feature of which we have only one
 */
export const reducers: ActionReducerMap<State> = {
  user: UserReducer.reducer,
};

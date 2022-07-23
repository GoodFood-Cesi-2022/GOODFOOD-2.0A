import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

/**
 * @ActionReducerMap Map of all the reducers in this feature of which we have only one
 */

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('actions', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [];

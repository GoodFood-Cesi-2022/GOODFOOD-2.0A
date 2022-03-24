// import { on, createReducer, Action } from "@ngrx/store";

// import { AuthActions } from "src/app/shared/store/action-types";
// import { AuthState, initialAuthState } from "./auth.state";

// export const authFeatureKey = 'auth';

// export const _authReducer = createReducer(
//     initialAuthState,

//     on(AuthActions.userLoaded, (state, action) => {
//         return {
//             ...state,
//             user: action.user,
//         };
//     }),
// );

// export function AuthReducer(state: AuthState | undefined, action: Action) {
//     return _authReducer(state, action);
// }

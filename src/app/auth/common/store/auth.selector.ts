import { Roles } from "src/app/shared/constants/endpoints";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('Auth');

export const selectUser = createSelector(selectAuthState, (auth) => auth.user);

export const controlAccess = createSelector(selectAuthState, auth => {
    return canAccess(auth, [Roles.ADMINISTRATOR, Roles.MANAGER, Roles.FRANCHISEE]);
});

// TODO : I don't need it !!!!?
export const reseauAccess = createSelector(
    selectAuthState,
    auth => {
        return canAccess(auth, [Roles.ADMINISTRATOR, Roles.MANAGER, Roles.FRANCHISEE]);
    }
);

function canAccess(auth: AuthState, roles: string[]): boolean {
    let grantedAccess = false;

    for (const role of roles) {
        if (auth.user && auth.user.roles?.includes(role)) {
            grantedAccess = true;
            break;
        }
    }
    return grantedAccess;
}
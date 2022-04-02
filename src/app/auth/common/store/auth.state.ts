import { User } from "../models/user";

export interface AuthState {
    user: User | undefined;
}

export const initialAuthState: AuthState = {
    user: undefined,
};
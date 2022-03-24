export interface User {
    [x: string]: any;

    id?: number;
    username?: string;
    password?: string;
    email?: string;
    rememberMe?: boolean;
    roles?: string[];
    authorization?: Authorization;
}

/**
 * Define User role 
 */
export interface Authorization {

    isAdmin: boolean;
    isManager: boolean;
    isFranchisee: boolean;
}

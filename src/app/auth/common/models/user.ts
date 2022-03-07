export interface User {

    id?: number;
    username?: string;
    password?: string;
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

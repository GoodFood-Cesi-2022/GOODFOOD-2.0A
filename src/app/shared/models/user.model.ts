export interface User {
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  roles?: string[];
  autorisations?: Autorisation;
}
export interface Autorisation {
  isAdmin: boolean;
  isFranchisee: boolean;
}

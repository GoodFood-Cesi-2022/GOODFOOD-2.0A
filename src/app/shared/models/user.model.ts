export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  code?: string;
  autorisations?: Autorisation;
}
export interface Autorisation {
  isAdmin: boolean;
  isFranchisee: boolean;
}

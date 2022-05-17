export interface User {
  id?: number,
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  created_at: string,
  updated_at: string
  roles?: string[];
  autorisations?: Autorisation;
}
export interface Autorisation {
  isAdmin: boolean;
  isFranchisee: boolean;
}

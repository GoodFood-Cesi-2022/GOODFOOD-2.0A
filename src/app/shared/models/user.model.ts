type role = { code: string };

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  //code?: string;
  roles?: role[];
  autorisations?: Autorisation;
}
export interface Autorisation {
  isAdmin: boolean;
  isFranchisee: boolean;
}

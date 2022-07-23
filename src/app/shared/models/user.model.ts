import { Role } from "./role.model";
export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  roles?: Role[];
  autorisations?: Autorisation;
}
export interface Autorisation {
  isAdmin: boolean;
  isFranchisee: boolean;
}

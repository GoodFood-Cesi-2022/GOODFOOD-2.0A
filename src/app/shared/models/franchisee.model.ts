import { Address } from './address.model';
import { User } from './user.model';

export interface Franchisee {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  max_delivery_radius?: number;
  address_id?: number;
  ownedBy?: User;
  owned_by?: number;
  create_by?: number;
  address?: Address;
}

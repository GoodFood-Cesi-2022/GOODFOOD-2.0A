import { Address } from './address.model';

export interface Franchisee {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  timezone?: string;
  max_delivery_radius?: number;
  address_id?: number;
  create_by?: number;
  address?: Address;
}

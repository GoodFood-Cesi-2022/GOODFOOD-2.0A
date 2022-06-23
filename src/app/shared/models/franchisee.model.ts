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

export interface Address {
  id?: number;
  first_line?: string;
  second_line?: string;
  zip_code?: string;
  country?: string;
  city?: string;
  lat?: string;
  lon?: string;
}

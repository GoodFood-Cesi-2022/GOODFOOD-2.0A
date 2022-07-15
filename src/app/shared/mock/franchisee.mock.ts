import { Franchisee } from '../models/franchisee.model';
import { mockAddress } from './address.mock';
import { mockUser1 } from './users.mock';

const mockFranchisee: Franchisee = {
  id: 1,
  name: 'chez moi',
  phone: '01 22 33 44 55',
  email: 'user@example.com',
  max_delivery_radius: 5,
  address_id: 1,
  ownedBy: mockUser1,
  owned_by: 1,
  create_by: 1,
  address: mockAddress,
};

const mockFranchiseeArray: Franchisee[] = [mockFranchisee];

export { mockFranchisee, mockFranchiseeArray };

import { User } from '../models/user.model';

const mockUser1: User = {
  id: 1,
  firstname: 'Sara',
  lastname: 'Dubois',
  email: 'Product@Description.fr',
  phone: '12345678',
};
const mockUser2: User = {
  id: 2,
  firstname: 'Zara',
  lastname: 'Dubeau',
  email: 'Product@Description.com',
  phone: '11111111',
};
const mockUser3: User = {
  id: 3,
  firstname: 'Bahar',
  lastname: 'Sdqi',
  email: 'Product@Description.org',
  phone: '00000000',
};

const mockUserArray: User[] = [mockUser1, mockUser2, mockUser3];

export { mockUser1, mockUser2, mockUser3, mockUserArray };

import { User } from "../models/user.model";
import { mockRole1, mockRole2, mockRoleArray } from "./role.mock";

const mockUser1: User = {
  id: 1,
  firstname: "Sara",
  lastname: "Dubois",
  email: "Product@Description.fr",
  phone: "12345678",
  roles: [mockRole1],
};
const mockUser2: User = {
  id: 2,
  firstname: "Zara",
  lastname: "Dubeau",
  email: "Product@Description.com",
  phone: "11111111",
};
const mockUser3: User = {
  id: 3,
  firstname: "Bahar",
  lastname: "Sdqi",
  email: "Product@Description.org",
  phone: "00000000",
};

const mockUserAuth: User = {
  id: 1,
  firstname: "Sara",
  lastname: "Dubois",
  email: "Product@Description.fr",
  phone: "12345678",
  roles: [
    {
      code: "goodfood",
    },
    {
      code: "contractor",
    },
  ],
};

const mockUserAuth1: User = {
  id: 1,
  firstname: "Sara",
  lastname: "Dubois",
  email: "Product@Description.fr",
  phone: "12345678",
  roles: [mockRole1],
};

const mockUserAuth2: User = {
  id: 1,
  firstname: "Sara",
  lastname: "Dubois",
  email: "Product@Description.fr",
  phone: "12345678",
  roles: [mockRole2],
};

const mockUserWithAuth: User = {
  id: 1,
  firstname: "Sara",
  lastname: "Dubois",
  email: "Product@Description.fr",
  phone: "12345678",
  roles: [
    {
      code: "goodfood",
    },
    {
      code: "contractor",
    },
  ],
  autorisations: {
    isAdmin: true,
    isFranchisee: true,
  },
};

const mockUserWithAuth1: User = {
  id: 1,
  firstname: "Sara",
  lastname: "Dubois",
  email: "Product@Description.fr",
  phone: "12345678",
  roles: [mockRole1],
  autorisations: {
    isAdmin: true,
    isFranchisee: false,
  },
};

const mockUserArray: User[] = [mockUser1, mockUser2, mockUser3];

export {
  mockUser1,
  mockUser2,
  mockUser3,
  mockUserAuth,
  mockUserAuth1,
  mockUserAuth2,
  mockUserWithAuth,
  mockUserWithAuth1,
  mockUserArray,
};

import { Role } from "../models/role.model";

const mockRole1: Role = {
  id: 1,
  code: "goodfood",
};
const mockRole2: Role = {
  id: 2,
  code: "contractor",
};

const mockRoleArray: Role[] = [mockRole1, mockRole2];

export { mockRole1, mockRole2, mockRoleArray };

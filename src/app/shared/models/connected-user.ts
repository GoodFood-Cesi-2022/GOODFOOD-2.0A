export interface ConnectedUser {
  identityID?: string;
  accountName?: string;
  firstName?: string;
  lastName?: string;
  authentication?: Authentication;
}
export interface Authentication {
  ADMIN?: boolean;
  FRANCHISEE?: boolean;
}

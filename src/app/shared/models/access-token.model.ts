export interface AccessTokenModel {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  expire_at?: number;
}

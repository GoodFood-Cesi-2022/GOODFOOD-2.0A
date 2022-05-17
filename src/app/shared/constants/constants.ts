export enum HttpVerbs {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum CodeHTTP {
  HTTP_200_OK = 200,
  HTTP_401_UNAUTHORIZED = 401,
  HTTP_403_FORBIDDEN = 403,
  HTTP_404_NOT_FOUND = 404,
  HTTP_511_NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export enum EndPoints {
  LOGIN = '/login',
  //TODO check with @Thomas
  LOGOUT = '/api/logout',
  SECURE_USER = 'SECURE_USER',
}

export enum Roles {
  ADMIN = 'admin',
  FRANCHISEE = 'contractor',
}

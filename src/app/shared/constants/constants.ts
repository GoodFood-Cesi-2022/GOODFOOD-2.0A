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
  LOGOUT = '/api/logout',
  SECURE_USER = 'SECURE_USER',
  CREATE_RECIPE = 'Créer une nouvelle recette',
  EDIT_RECIPE = 'Modifier la recette',
  GENERIC_SUCCESS = 'Les modifications ont bien été prises en compte.',
  PAYLOAD = 'payload',
}

export enum Message {
  UPDATE = 'La recette est bien mise à jour.',
  CREATE = "L'article est bien créé",
  UPDATE_SUCCESS = 'Les modifications ont bien été prises en compte.',
}

export enum Roles {
  ADMIN = 'goodfood',
  FRANCHISEE = 'contractor',
}

export enum StorageKeys {
  STATE = 'AUTH_STATE',
  CODE_VERIFY = 'AUTH_CODE_VERIFIER',
  USER_TOKEN = 'AUTH_USER_TOKEN',
  USER = 'CURRENT_USER',
  ROLE = 'ROLE',
}

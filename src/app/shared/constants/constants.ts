export enum HttpVerbs {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum EndPoints {
  LOGIN = '/login',
  LOGOUT = '/api/logout',
  SECURE_USER = 'SECURE_USER',
  CREATE_RECIPE = 'Créer une nouvelle recette',
  EDIT_RECIPE = 'Modifier la recette',
  CREATE_TYPE = "Créer un nouveay type d'ingrédient",
  EDIT_TYPE = "Modifier le type d'indrédient",
  GENERIC_SUCCESS = 'Les modifications ont bien été prises en compte.',
  PAYLOAD = 'payload',
}

export enum Message {
  UPDATE = '204 No Content',
  CREATE = '201 Created',
  DELETE = '204 No Content',
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

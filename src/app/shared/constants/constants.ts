export enum HttpVerbs {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
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

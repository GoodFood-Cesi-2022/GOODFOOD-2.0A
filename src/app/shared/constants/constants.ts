export enum HttpVerbs {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum CodeHTTP {
  HTTP_200_OK = 200,
  HTTP_401_UNAUTHORIZED = 401,
  HTTP_403_FORBIDDEN = 403,
  HTTP_404_NOT_FOUND = 404,
  HTTP_511_NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export enum Const {
  MODIFIER_LA_TACHE = 'Modifier la tâche',
  CREER_LA_TACHE = 'Créer la tâche',
  VEUILLEZ_PATIENTER = 'Veuillez patienter',
  ZERO_TACHE = 'Vous n\'avez pas de taches pour cette équipe',
  GENERIC_ERROR = 'Une erreur est survenue.',
  GENERIC_SUCCESS = 'Les modifications ont bien été prises en compte.',
  FORMAT_DD_MM_YYYY = 'DD/MM/YYYY',
  VERSION = 'v1.0.19'
}

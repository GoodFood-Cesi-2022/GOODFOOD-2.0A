// https://angular.io/guide/build

/**
 *
 *  This file can be replaced during build by using the `fileReplacements` array.
 * `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 *
 */
export const environment = {
  production: false,
  appUrl: 'http://localhost:4200',
  apiBaseUrl: 'http://localhost:8080/api',
  oAuthProviderBaseUrl: 'http://localhost:8085/oauth',
  oAuthClientId: '96560464-28d1-401b-9c39-0fe271d28c2d',
  oAuthCallbackUri: 'http://localhost:4200/login/redirect',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

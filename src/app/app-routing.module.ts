import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  /**
   * Redirect to login page
   * @url https://angular.io/guide/router
   */
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'home', component: DefaultComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./principal/principal.module').then((m) => m.PrincipalModule),
    canActivate: [],
  },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

export const routing = RouterModule.forRoot(ROUTES, { useHash: false });

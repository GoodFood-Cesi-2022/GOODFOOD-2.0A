import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { IsUnauthenticatedGuard } from './shared/guards/is-unauthenticated.guard';

const ROUTES: Routes = [
  /**
   * Redirect to login page
   * @url https://angular.io/guide/router
   */
  {  
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
    canActivate: [
      IsUnauthenticatedGuard
    ]
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./principal/principal.module').then((m) => m.PrincipalModule),
    canActivate: [
      IsAuthenticatedGuard
    ],
  },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

export const routing = RouterModule.forRoot(ROUTES, { useHash: false });

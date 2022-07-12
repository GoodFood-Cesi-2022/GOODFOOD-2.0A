import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './layouts/components/page-not-found/page-not-found.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated/is-authenticated.guard';
import { IsUnauthenticatedGuard } from './shared/guards/is-unauthenticated/is-unauthenticated.guard';

const ROUTES: Routes = [
  /**
   * Redirect to login page
   * @url https://angular.io/guide/router
   */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // canLoad: [IsUnauthenticatedGuard],
    canActivate: [IsUnauthenticatedGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./principal/principal.module').then((m) => m.PrincipalModule),
    // canLoad: [IsAuthenticatedGuard],
    canActivate: [IsAuthenticatedGuard],
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

export const routing = RouterModule.forRoot(ROUTES, { useHash: false });

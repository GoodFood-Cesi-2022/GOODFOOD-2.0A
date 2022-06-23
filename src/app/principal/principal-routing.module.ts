import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal.component';

const ROUTES: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./recipe-details/recipe-details.module').then(
            (m) => m.RecipeManagementModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'franchisee',
        loadChildren: () =>
          import('./franchisee/franchisee.module').then(
            (m) => m.FranchiseeModule
          ),
      },
      { path: '**', redirectTo: 'page-not-found' },
    ],
  },
];

export const routing = RouterModule.forChild(ROUTES);

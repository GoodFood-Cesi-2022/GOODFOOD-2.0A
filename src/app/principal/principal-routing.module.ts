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
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      // {
      //   path: 'gestion-taches', loadChildren: () =>
      //  import('./gestion-taches/gestion-taches.module').then((m)
      //  => m.GestionTachesModule)
      // },
      { path: '**', redirectTo: 'page-not-found' },
    ],
  },
];

export const routing = RouterModule.forChild(ROUTES);

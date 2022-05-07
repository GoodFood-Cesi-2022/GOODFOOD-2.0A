import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login.component';

const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'redirect',
    component: CallbackComponent
  }
];

export const LoginRouter = RouterModule.forChild(ROUTES);

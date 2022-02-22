import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { FranchiseeComponent } from './franchisee/franchisee.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'Franchisee', component: FranchiseeComponent },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  /**
   * Otherwise redirect to home
   * @url https://angular.io/guide/router
   */
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
